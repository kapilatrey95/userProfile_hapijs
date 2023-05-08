import * as Joi from '@hapi/joi';

export default {
    userSignIn: {
        headers: Joi.object({
                
        }).options({ allowUnknown: true }),
    },
};
