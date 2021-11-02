import {
  requestedProperties
} from '../../src/graphQL/util';

describe('Function: recursiveAddProperties', () => {
  test('return correct object', async () => {
    // @ts-ignore
    const res = requestedProperties('test', {
      fieldNodes: [
        {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "test",
          },
          "arguments": [
            {
              "kind": "Argument",
              "name": {
                "kind": "Name",
                "value": "paginationInput",
              },
              "value": {
                "kind": "Variable",
                "name": {
                  "kind": "Name",
                  "value": "paginationInput",
                }
              }
            }
          ],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [
              {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "data"
                },
                "arguments": [],
                "directives": [],
                "selectionSet": {
                  "kind": "SelectionSet",
                  "selections": [
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "id"
                      },
                      "arguments": [],
                      "directives": []
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "name"
                      },
                      "arguments": [],
                      "directives": []
                    },
                    {
                      "kind": "Field",
                      "name": {
                        "kind": "Name",
                        "value": "email"
                      },
                      "arguments": [],
                      "directives": []
                    }
                  ]
                }
              },
              {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "total"
                },
                "arguments": [],
                "directives": []
              }
            ]
          }
        }
      ]
    });
    expect(res).toEqual({
      data: {
        id: {},
        name: {},
        email: {}
      },
      total: {}
    });
  });
});
