import { APIBasicConfig, APIContext, APICoresMode, APIIdentifier, APIResponseType, APIType, Client, ClientAPIResponse, Currency, CurrencyAPIResponse, Exception, Feature, FeatureAPIResponse, Order, OrderAPIResponse, Preference, PreferenceAPIResponse, User, UserAPIResponse } from "../types/ContextTypes";





export class Api<T, TResponse> implements APIType<T, TResponse>, APIBasicConfig, APIContext, APIIdentifier, APICoresMode {

    public baseURL: string;
    public context: string;
    public identifier: string;
    public corsMode: RequestMode | undefined;

    constructor(context: string, identifier: string, corsMode?: RequestMode | undefined) {
        if (corsMode !== undefined) this.corsMode = corsMode; 
        this.context = context;
        this.identifier = identifier;
        this.baseURL = "http://localhost:80/client-manager/api";
    }

    async get(identifierValue: string): Promise<TResponse> {
        return await fetch( this.baseURL + "/" + this.context + "/get?" + this.identifier + "=" + identifierValue, {
            method: 'get',
            mode: this.corsMode
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    };

    async getAll(): Promise<TResponse> {
        return await fetch(this.baseURL + "/" + this.context, {
            method: 'get',
            mode: this.corsMode
        })
        .then(res => res.json())
        .then((data: TResponse) => {
            return data;
        });
    };

    async create(object: T): Promise<APIResponseType<TResponse>> {
        return await fetch(this.baseURL + "/" + this.context + "/new", {
            method: 'post',
            mode: this.corsMode,
            body: JSON.stringify(object)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }

    async edit(object: T): Promise<APIResponseType<TResponse>> {
        return await fetch(this.baseURL + "/" + this.context + "/edit", {
            method: 'post',
            mode: this.corsMode,
            body: JSON.stringify(object)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }
    
    async delete(identifierValue: string): Promise<APIResponseType<TResponse>> {
        return await fetch(this.baseURL + "/" + this.context + "/delete?" + this.identifier + "=" + identifierValue, {
            method: 'get',
            mode: this.corsMode
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }    
}

export class ClientAPI extends Api<Client, ClientAPIResponse> {
    constructor() {
        super('clients', 'id', 'cors');
    }
}

export class OrderAPI extends Api<Order, OrderAPIResponse> {
    constructor() {
        super('orders', 'order_id', 'cors');
    }
}

export class UserAPI extends Api<User, UserAPIResponse> {
    constructor() {
        super('users', 'username', 'cors');
    }
}

export class PreferenceAPI extends Api<Preference, PreferenceAPIResponse> {
    constructor() {
        super('preferences', 'slug', 'cors');
    }
}

export class CurrencyAPI extends Api<Currency, CurrencyAPIResponse> {
    constructor() {
        super('currencies', 'slug', 'cors');
    }
}

export class SystemAPI extends Api<object, object> {
    constructor() {
        super('system', 'slug', 'cors');
    }

    async ResetAllPreferences(): Promise<APIResponseType<object>> {
        return await fetch( this.baseURL + "/" + this.context + "/reset-preferences", {
            method: 'get',
            mode: this.corsMode
        })
        .then(res => res.json())
        .then((data: APIResponseType<object>) => {
            return data;
        });
    }
}

export class FeatureAPI extends Api<Feature, FeatureAPIResponse> {
    constructor() {
        super('features', 'slug', 'cors');
    }
}