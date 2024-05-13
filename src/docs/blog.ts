const blogResponse = {
  data: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        source: {
          id: {
            type: 'string',
            example: 'source_id',
          },
          name: {
            type: 'string',
            example: 'Source Name',
          },
        },
        author: {
          type: 'string',
          example: 'Author Name',
        },
        title: {
          type: 'string',
          example: 'Blog Title',
        },
        description: {
          type: 'string',
          example: 'Blog Description',
        },
        url: {
          type: 'string',
          example: 'https://example.com',
        },
        urlToImage: {
          type: 'string',
          example: 'https://example.com/image.jpg',
        },
        publishedAt: {
          type: 'string',
          example: '2022-04-03T12:00:00Z',
        },
        content: {
          type: 'string',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        }
      }
    }
  },
  message: {
    type: 'string',
    example: 'Success',
  },
  totalRecords: {
    type: 'number',
    example: 10,
  },
  totalPages: {
    type: 'number',
    example: 2,
  },
  rows: {
    type: 'number',
    example: 5,
  },
  currentPage: {
    type: 'number',
    example: 1,
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


const getBlogs = {
  tags: ['Blogs'],
  description: 'Retrieve all blogs',
  operationId: 'getBlogs',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Blogs retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: blogResponse,
            },
          },
        },
      },
    },
    '500': internalServerError,
  },
};

export { getBlogs };
