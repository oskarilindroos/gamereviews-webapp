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
	testCharacterGet    string = "test_data/character_get.json"
	testCharacterList   string = "test_data/character_list.json"
	testCharacterSearch string = "test_data/character_search.json"
)

func TestCharacterService_Get(t *testing.T) {
	f, err := ioutil.ReadFile(testCharacterGet)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*Character, 1)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct {
		name          string
		file          string
		id            int
		opts          []Option
		wantCharacter *Character
		wantErr       error
	}{
		{"Valid response", testCharacterGet, 12690, []Option{SetFields("name")}, init[0], nil},
		{"Invalid ID", testFileEmpty, -1, nil, nil, ErrNegativeID},
		{"Empty response", testFileEmpty, 12690, nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, 12690, []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, 0, nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			ch, err := c.Characters.Get(test.id, test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(ch, test.wantCharacter) {
				t.Errorf("got: <%v>, \nwant: <%v>", ch, test.wantCharacter)
			}
		})
	}
}

func TestCharacterService_List(t *testing.T) {
	f, err := ioutil.ReadFile(testCharacterList)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*Character, 0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct {
		name           string
		file           string
		ids            []int
		opts           []Option
		wantCharacters []*Character
		wantErr        error
	}{
		{"Valid response", testCharacterList, []int{11079, 799, 11563, 7337, 11576}, []Option{SetLimit(5)}, init, nil},
		{"Zero IDs", testFileEmpty, nil, nil, nil, ErrEmptyIDs},
		{"Invalid ID", testFileEmpty, []int{-500}, nil, nil, ErrNegativeID},
		{"Empty response", testFileEmpty, []int{11079, 799, 11563, 7337, 11576}, nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, []int{11079, 799, 11563, 7337, 11576}, []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, []int{0, 9999999}, nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			ch, err := c.Characters.List(test.ids, test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(ch, test.wantCharacters) {
				t.Errorf("got: <%v>, \nwant: <%v>", ch, test.wantCharacters)
			}
		})
	}
}

func TestCharacterService_Index(t *testing.T) {
	f, err := ioutil.ReadFile(testCharacterList)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*Character, 0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		name           string
		file           string
		opts           []Option
		wantCharacters []*Character
		wantErr        error
	}{
		{"Valid response", testCharacterList, []Option{SetLimit(5)}, init, nil},
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

			ch, err := c.Characters.Index(test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(ch, test.wantCharacters) {
				t.Errorf("got: <%v>, \nwant: <%v>", ch, test.wantCharacters)
			}
		})
	}
}

func TestCharacterService_Search(t *testing.T) {
	f, err := ioutil.ReadFile(testCharacterSearch)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*Character, 0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct {
		name           string
		file           string
		qry            string
		opts           []Option
		wantCharacters []*Character
		wantErr        error
	}{
		{"Valid response", testCharacterSearch, "super", []Option{SetLimit(50)}, init, nil},
		{"Empty query", testFileEmpty, "", []Option{SetLimit(50)}, nil, ErrEmptyQry},
		{"Empty response", testFileEmpty, "super", nil, nil, errInvalidJSON},
		{"Invalid option", testFileEmpty, "super", []Option{SetOffset(-99999)}, nil, ErrOutOfRange},
		{"No results", testFileEmptyArray, "non-existent entry", nil, nil, ErrNoResults},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			ts, c, err := testServerFile(http.StatusOK, test.file)
			if err != nil {
				t.Fatal(err)
			}
			defer ts.Close()

			ch, err := c.Characters.Search(test.qry, test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !reflect.DeepEqual(ch, test.wantCharacters) {
				t.Errorf("got: <%v>, \nwant: <%v>", ch, test.wantCharacters)
			}
		})
	}
}

func TestCharacterService_Count(t *testing.T) {
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

			count, err := c.Characters.Count(test.opts...)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if count != test.wantCount {
				t.Fatalf("got: <%v>, want: <%v>", count, test.wantCount)
			}
		})
	}
}

func TestCharacterService_Fields(t *testing.T) {
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

			fields, err := c.Characters.Fields()
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if !equalSlice(fields, test.wantFields) {
				t.Fatalf("Expected fields '%v', got '%v'", test.wantFields, fields)
			}
		})
	}
}
