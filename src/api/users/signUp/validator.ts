import * as Joi from '@hapi/joi';

export default {
    userSignUp: {
        payload: Joi.object({   
            userName: Joi.string().required(),
            password: Joi.string().required(),     
        }).options({ allowUnknown: true }),
    },
};
