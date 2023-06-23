import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import { Config } from "../core/Config";
import fs from "fs";
import { IDataProvider } from "../core/IDataProvider";
export class DataController extends Controller {

    private DataProvider: IDataProvider;

    public onRegister(): void {
        this.onGet("/", this.index);
        this.onGet("/list", this.list);
        this.onPost("/detail", this.getDetail);
    }

    /**
     * Shall provide the datatable interface with api data
     */
    public async index(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        res.bag.pageTitle = "API Data";
        res.bag.title = "IT Grow Division";
        res.view('index');
    }
    public async list(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        const searchStr: any = req.query.search;
        let startIndex = Number(req.query?.start);
        if (!startIndex || startIndex < 1) startIndex = 1;
        const pageSize: any = req.query?.length ? req.query.length : 10;
        const list = await this.DataProvider.getList(startIndex, pageSize, searchStr);
        const populateBag: any = [];
        let nestedData = {};
        try {
            if (list) {
                (list.data).map((row: any, i: number) => {
                    const action = "<a data-toggle='modal' data-target='#detail-modal' id='viewDetail' class='btn-primary btn btn-rounded' data-id='" + row.id + "' style='padding:0px 4px;' href='#'><i class='glyphicon glyphicon-eye-open'></i></a>";
                    nestedData = {
                        id: row.id,
                        node_id: row.node_id,
                        number: row.number,
                        title: row.title,
                        userLogin: row.userLogin ? row.userLogin : '',
                        userType: row.userType ? row.userType : '',
                        state: row.state,
                        author_association: row.author_association,
                        actions: action
                    };
                    populateBag.push(nestedData);
                });
                const tableData = JSON.stringify({
                    "draw": 1,
                    "iTotalRecords": list?.count,
                    "iTotalDisplayRecords": list?.count,
                    "limit": pageSize,
                    "aaData": populateBag
                });
                return res.send(tableData);
            }
        } catch (error) {
            return res.send({ status: 400, error: true, message: 'Something went wrong', action: "", data: error });
        }
    }
    public async getDetail(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        await this.DataProvider.getDetailById(req.body.id).then((detail) => {
            return res.send({ status: 200, error: false, message: 'detail data', action: '', data: detail });
        }).catch(err => {
            return res.send({ status: 404, error: true, message: err, action: 'data not found', data: {} });
        });
    }
}