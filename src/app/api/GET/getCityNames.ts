type Field = {
    name: string;
    label_en: string;
    coordinates: [number, number];
}

type Record = {
    fields: Field[];
}


export const getCityNames = async (text: string = "") => {
    const endpoint = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${text}`;

    try {
        const response = await fetch(endpoint);
        const payload = await response.json();

        return payload.records
            .map((r: Record) => r.fields)
            .map(({ name, label_en, coordinates }: Field) => {
                return {
                    name,
                    country: label_en,
                    coordinates
                }
            });
    } catch {
        return []
    }
}
