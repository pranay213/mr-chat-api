// AUTO-GENERATED. Do not edit.
export const swaggerSpec = {
  "openapi": "3.0.0",
  "info": {
    "title": "MR Chat API",
    "version": "1.0.0"
  },
  "paths": {
    "/api/profile": {
      "get": {
        "summary": "GET /api/profile",
        "tags": [
          "Profile"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "message": "Sample request body"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "message": "Request successful",
                  "data": {}
                }
              }
            }
          }
        }
      }
    },
    "/api/users/register": {
      "post": {
        "summary": "POST /api/users/register",
        "tags": [
          "User"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "message": "Sample request body"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "message": "Request successful",
                  "data": {}
                }
              }
            }
          }
        }
      }
    },
    "/api/users/some-test": {
      "post": {
        "summary": "POST /api/users/some-test",
        "tags": [
          "User"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "message": "Sample request body"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "message": "Request successful",
                  "data": {}
                }
              }
            }
          }
        }
      }
    },
    "/api/users/new-route": {
      "post": {
        "summary": "POST /api/users/new-route",
        "tags": [
          "User"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "message": "Sample request body"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "message": "Request successful",
                  "data": {}
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Data": {
        "title": "data",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "_id": {
            "type": "string"
          }
        }
      },
      "User": {
        "title": "User",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "_id": {
            "type": "string"
          }
        }
      }
    }
  }
};
