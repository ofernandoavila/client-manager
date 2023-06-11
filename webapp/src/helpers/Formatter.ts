import { useEffect, useState } from "react";
import { GenericObjectType, Preference } from "../types/ContextTypes";
import { PreferencesHelper } from "./PreferencesHelper";

const useFormatter = () => {
    const [decimalSeparator, setDecimalSeparator] = useState("");
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        const fetch = async () => {
            let currency = await PreferencesHelper.GetPreference("currency");
            setCurrency(currency.value);

            let decimalSeparator = await PreferencesHelper.GetPreference(
                "decimal-separator"
            );
            setDecimalSeparator(decimalSeparator.value);
        };
        fetch();
    }, []);

    const Currency = (value: number): string => {
        const parts = value.toFixed(2).split(".");
        const formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const final =
            currency + " " + formattedValue + decimalSeparator + parts[1];
        return final;
    };

    const StringFormatter = (
        format: string,
        obj: GenericObjectType,
        values: string[]
    ): string => {
        return format.replace(/{(\d+)}/g, (match, indice) => {
            const value = obj[values[indice]];
            return typeof value !== "undefined" ? value : match;
        });
    };

    const CamelToString = (value: string): string => {
        const regex = /([a-z])([A-Z])/g;
        const novaString = value.replace(regex, '$1 $2');
        return novaString.charAt(0).toUpperCase() + novaString.slice(1);
    }

    return { Currency, StringFormatter, CamelToString };
};

export default useFormatter;
