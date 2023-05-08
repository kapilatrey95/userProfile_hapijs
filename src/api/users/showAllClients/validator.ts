import * as Joi from '@hapi/joi';

export default {
    users: {
        headers: Joi.object({
                
        }).options({ allowUnknown: true }),
    },
};
