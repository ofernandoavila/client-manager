import {
    APIBasicConfig,
    APIContext,
    APICoresMode,
    APIError,
    APIGetAllResponse,
    APIGetResponse,
    APIIdentifier,
    APIResponseType,
    APIType,
    Client,
    Currency,
    Feature,
    Order,
    Preference,
    User
} from "../types/ContextTypes";

export class Api<T>
    implements
        APIType<T>,
        APIBasicConfig,
        APIContext,
        APIIdentifier,
        APICoresMode
{
    public baseURL: string;
    public context: string;
    public identifier: string;
    public corsMode: RequestMode | undefined;

    constructor(
        context: string,
        identifier: string,
        corsMode?: RequestMode | undefined
    ) {
        if (corsMode !== undefined) this.corsMode = corsMode;
        this.context = context;
        this.identifier = identifier;
        this.baseURL = "http://localhost:80/client-manager/api";
    }

    async get(identifierValue: string): Promise<T> {
        return await fetch(
            this.baseURL +
                "/" +
                this.context +
                "/get?" +
                this.identifier +
                "=" +
                identifierValue,
            {
                method: "get",
                mode: this.corsMode,
            }
        )
        .then( response => response.json())
        .then( data => {
            if(data.code !== null && data.code !== undefined) {
                throw new Error(data.message);
            }

            return data;
        });
    }

    async getAll(): Promise<Array<T>> {
        return await fetch(this.baseURL + "/" + this.context, {
            method: "get",
            mode: this.corsMode,
        })
        .then( response => response.json())
        .then( data => {
            if(data.code !== null && data.code !== undefined) {
                throw new Error(data.message);
            }

            return data;
        });
    }

    async create(object: T): Promise<APIResponseType> {
        return await fetch(this.baseURL + "/" + this.context + "/new", {
            method: "post",
            mode: this.corsMode,
            body: JSON.stringify(object),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }

    async edit(object: T): Promise<APIResponseType> {
        return await fetch(this.baseURL + "/" + this.context + "/edit", {
            method: "post",
            mode: this.corsMode,
            body: JSON.stringify(object),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }

    async delete(identifierValue: string): Promise<APIResponseType> {
        return await fetch(
            this.baseURL +
                "/" +
                this.context +
                "/delete?" +
                this.identifier +
                "=" +
                identifierValue,
            {
                method: "get",
                mode: this.corsMode,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }
}

export class ClientAPI extends Api<Client> {
    constructor() {
        super("clients", "id", "cors");
    }
}

export class OrderAPI extends Api<Order> {
    constructor() {
        super("orders", "order_id", "cors");
    }
}

export class UserAPI extends Api<User> {
    constructor() {
        super("users", "username", "cors");
    }
}

export class PreferenceAPI extends Api<Preference> {
    constructor() {
        super("preferences", "slug", "cors");
    }
}

export class CurrencyAPI extends Api<Currency> {
    constructor() {
        super("currencies", "slug", "cors");
    }
}

export class SystemAPI extends Api<object> {
    constructor() {
        super("system", "slug", "cors");
    }

    async ResetAllPreferences(): Promise<APIResponseType> {
        return await fetch(
            this.baseURL + "/" + this.context + "/reset-preferences",
            {
                method: "get",
                mode: this.corsMode,
            }
        )
            .then((res) => res.json())
            .then((data: APIResponseType) => {
                return data;
            });
    }
}

export class FeatureAPI extends Api<Feature> {
    constructor() {
        super("features", "slug", "cors");
    }
}
