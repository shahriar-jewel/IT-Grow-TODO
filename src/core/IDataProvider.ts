import { Document } from "mongoose";
export interface IData {
    id: number,
    node_id: string,
    number: number,
    title: string,
    userLogin: string,
    userType: string,
    state: string,
    author_association: string
}
export interface IDataPage {
    data: IData[],
    size: number,
    page: number,
    count: number
}
export interface IDataProvider {
    /**
     * Get all data from api
     * @param id to look for
     * @param node_id to look for
     * @param number to look for
     * @param title to look for
     * @param userLogin to look for
     * @param userType to look for
     */
    getList(startIndex: number, pageSize: number, searchStr?: any): Promise<IDataPage>;
    /**
     *
     * @param id of data
     */
    getDetailById(id: number): Promise<IData>
}