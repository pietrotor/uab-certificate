const contactResponse = {
  _id: {
    type: 'string',
    example: '60564fcb544047cdc3844818',
  },
  name: {
    type: 'string',
    example: 'John Snow',
  },
  lastName: {
    type: 'string',
    example: 'Doe',
  },
  email: {
    type: 'string',
    example: 'john.snow@email.com',
  },
  business: {
    type: 'string',
    example: 'ABC Corporation',
  },
  profession: {
    type: 'string',
    example: 'Software Engineer',
  },
  country: {
    type: 'string',
    example: 'United States',
  },
  status: {
    type: 'boolean',
    example: true,
  },
  createdBy: {
    type: 'string',
    example: '605636683f6e29c81c8b2db0',
  },
  deleted: {
    type: 'boolean',
    example: false,
  },
  deletedAt: {
    type: 'string',
    example: null,
  },
  deletedBy: {
    type: 'string',
    example: null,
  },
  createdAt: {
    type: 'string',
    example: '2021-03-20T19:40:59.495Z',
  },
  updatedAt: {
    type: 'string',
    example: '2021-03-20T21:23:10.879Z',
  },
};

const createContactBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Snow',
    },
    lastName: {
      type: 'string',
      example: 'Doe',
    },
    email: {
      type: 'string',
      example: 'john.snow@email.com',
    },
    business: {
      type: 'string',
      example: 'ABC Corporation',
    },
    profession: {
      type: 'string',
      example: 'Software Engineer',
    },
    country: {
      type: 'string',
      example: 'United States',
    },
  },
};

const invalidContactData = {
  description: 'Invalid Data provided',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'The fields field1, field2 and field3 are required',
          },
        },
      },
    },
  },
};

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal Server Error',
          },
        },
      },
    },
  },
};

const createContact = {
  tags: ['Contacts'],
  description: 'Create a new contact',
  operationId: 'createContact',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createContactBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'User created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: contactResponse,
          },
        },
      },
    },
    '422': invalidContactData,
    '500': internalServerError,
  },
};

const getContacts = {
  tags: ['Contacts'],
  description: 'Retrieve all contacts',
  operationId: 'getContacts',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Contacts retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: contactResponse,
            },
          },
        },
      },
    },
    '500': internalServerError,
  },
};

export { contactResponse, createContact, createContactBody, getContacts };
