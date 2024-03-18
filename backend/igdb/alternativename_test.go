package igdb

import (
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"net/http"
	"reflect"
	"testing"
)

const (
	testAlternativeNameGet  string = "test_data/alternativename_get.json"
	testAlternativeNameList string = "test_data/alternativename_list.json"
)

func TestAlternativeNameService_Get(t *testing.T) {
	f, err := ioutil.ReadFile(testAlternativeNameGet)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*AlternativeName, 1)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct {
		name                string
		file                string
		id                  int
		opts                []Option
		wantAlternativeName *AlternativeName
		wantErr             error
	}{
		{"Valid response", testAlternativeNameGet, 8989, []Option{SetFields("name")}, init[0], nil},
		{"Invalid ID", testFileEmpty, -1, nil, nil, ErrNegativeID},
		{"Empty response", testFileEmpty, 8989, nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, 8989, []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, 0, nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			alt, err := c.AlternativeNames.Get(test.id, test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(alt, test.wantAlternativeName) {
				t.Errorf("got: <%v>, \nwant: <%v>", alt, test.wantAlternativeName)
			}
		})
	}
}

func TestAlternativeNameService_List(t *testing.T) {
	f, err := ioutil.ReadFile(testAlternativeNameList)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*AlternativeName, 0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct {
		name                 string
		file                 string
		ids                  []int
		opts                 []Option
		wantAlternativeNames []*AlternativeName
		wantErr              error
	}{
		{"Valid response", testAlternativeNameList, []int{10758, 3254, 9036, 9008, 4626, 13861, 13874, 13862}, []Option{SetLimit(5)}, init, nil},
		{"Zero IDs", testFileEmpty, nil, nil, nil, ErrEmptyIDs},
		{"Invalid ID", testFileEmpty, []int{-500}, nil, nil, ErrNegativeID},
		{"Empty response", testFileEmpty, []int{10758, 3254, 9036, 9008, 4626, 13861, 13874, 13862}, nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, []int{10758, 3254, 9036, 9008, 4626, 13861, 13874, 13862}, []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, []int{0, 9999999}, nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			alt, err := c.AlternativeNames.List(test.ids, test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(alt, test.wantAlternativeNames) {
				t.Errorf("got: <%v>, \nwant: <%v>", alt, test.wantAlternativeNames)
			}
		})
	}
}

func TestAlternativeNameService_Index(t *testing.T) {
	f, err := ioutil.ReadFile(testAlternativeNameList)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*AlternativeName, 0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		name                 string
		file                 string
		opts                 []Option
		wantAlternativeNames []*AlternativeName
		wantErr              error
	}{
		{"Valid response", testAlternativeNameList, []Option{SetLimit(5)}, init, nil},
		{"Empty response", testFileEmpty, nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			alt, err := c.AlternativeNames.Index(test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(alt, test.wantAlternativeNames) {
				t.Errorf("got: <%v>, \nwant: <%v>", alt, test.wantAlternativeNames)
			}
		})
	}
}

func TestAlternativeNameService_Count(t *testing.T) {
	var tests = []struct {
		name      string
		resp      string
		opts      []Option
		wantCount int
		wantErr   error
	}{
		{"Happy path", `{"count": 100}`, []Option{SetFilter("hypes", OpGreaterThan, "75")}, 100, nil},
		{"Empty response", "", nil, 0, errInvalidJSON},
		{"Invalid option", "", []Option{SetLimit(-100)}, 0, ErrOutOfRange},
		{"No results", "[]", nil, 0, ErrNoResults},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c := testServerString(http.StatusOK, test.resp)
			defer ts.Close()

			count, err := c.AlternativeNames.Count(test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if count != test.wantCount {
				t.Fatalf("got: <%v>, want: <%v>", count, test.wantCount)
			}
		})
	}
}

func TestAlternativeNameService_Fields(t *testing.T) {
	var tests = []struct {
		name       string
		resp       string
		wantFields []string
		wantErr    error
	}{
		{"Happy path", `["name", "slug", "url"]`, []string{"url", "slug", "name"}, nil},
		{"Asterisk", `["*"]`, []string{"*"}, nil},
		{"Empty response", "", nil, errInvalidJSON},
		{"No results", "[]", nil, nil},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c := testServerString(http.StatusOK, test.resp)
			defer ts.Close()

			fields, err := c.AlternativeNames.Fields()
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !equalSlice(fields, test.wantFields) {
				t.Fatalf("Expected fields '%v', got '%v'", test.wantFields, fields)
			}
		})
	}
}
