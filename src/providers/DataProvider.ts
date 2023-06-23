import { IData, IDataPage, IDataProvider } from "../core/IDataProvider";
import { Config } from "../core/Config";
import fs from "fs";
import axios from "axios";

export class DataProvider implements IDataProvider {

    private CONFIG_FILE;
    private APP_CONFIG: Config;

    constructor(){
        this.CONFIG_FILE = "config.json"; // config file
        this.APP_CONFIG = new Config(JSON.parse(fs.readFileSync(this.CONFIG_FILE).toString()));
    }

    public async getList(startIndex: any = 1, size: any = 10, searchStr?: any): Promise<IDataPage> {
        let bag: any = [];
        let recordsFiltered;
        const response = await axios.get(`${this.APP_CONFIG.apiUrl}`);
        try {
            if (searchStr.value !== '') {
                bag = (response.data).filter((r: any) => {
                    return (r.node_id === searchStr.value || r.id === Number(searchStr.value) ||
                        r.number === Number(searchStr.value) ||
                        r.user.login === searchStr.value || (r.title).includes(searchStr.value)
                    );
                }).slice(startIndex, parseInt(startIndex, 10) + parseInt(size, 10));
                recordsFiltered = bag.length;
            } else {
                bag = (response.data).slice(startIndex, parseInt(startIndex, 10) + parseInt(size, 10));
                recordsFiltered = (response.data).length;
            }
            return { data: bag, size, page: startIndex, count: recordsFiltered };
        } catch (error) {
            return { data: [], size, page: startIndex, count: 0 };
        }
    }

    public async getDetailById(id: any): Promise<any> {
        const response = await axios.get(`${this.APP_CONFIG.apiUrl}`);
        if(response){
            const row = (response.data).find((r:any) => {
                if(r.id === parseInt(id, 10)) return r;
            });
            return row;
        }else{
            return;
        }
    }
}