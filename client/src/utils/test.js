import Axios from "axios";

export function getMockedHttp(data) {
    const mockedAxios = Axios;
    mockedAxios.get.mockResolvedValue({ data });
    return mockedAxios;
}

