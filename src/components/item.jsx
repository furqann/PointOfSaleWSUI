import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
class Item extends Component {

    state = {
        item: {},
        navigationDtl: {}
    }

    componentDidMount() {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleItemChange = (event) => {
        console.log("Target name", event.target.name);
        console.log(event.target.value);
        let item = this.state.item;
        item[event.target.name] = event.target.value;
        this.setState({ item });
    }

    /* handleSubmit = (event) => {
        let itemCode = this.state.item.itemCode;
        if (itemCode == null) {
            this.saveItem();
        } else {
            this.updateItem();
        }
    } */

    newItem = () => {
        this.setState({ item: {}, navigationDtl: { first: true, last: true } });
    }

    saveItem = () => {
        console.log("Post: Object sent: ", this.state.item);
        axios.post('http://localhost:8089/item', this.state.item)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
            })
            .catch(err => {
                console.log(err);
            });
    }

    /*   updateItem = () => {
          console.log("Put: Object sent: ", this.state.item);
          axios.put('http://localhost:8089/item', this.state.item)
              .then(res => {
                  console.log("Put: Object received: ", res)
              })
              .catch(err => {
                  console.log(err);
              });
      } */

    deleteItem = () => {
        console.log("Delete: Item Code sent: ", this.state.item.itemCode);
        axios.delete('http://localhost:8089/item/' + this.state.item.itemCode)
            .then(res => {
                console.log("Delete: Response: ", res);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstItem = () => {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    previousItem = () => {
        axios.get('http://localhost:8089/item/previous')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    nextItem = () => {
        axios.get('http://localhost:8089/item/next')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    lastItem = () => {
        axios.get('http://localhost:8089/item/last')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        const { item, navigationDtl } = this.state;

        const { itemStocks: stocks } = item;
        const columns = [{
            dataField: 'itemStockDate',
            text: 'Stock Date'
        },
        {
            dataField: 'qnty',
            text: 'Stock Quantity'
        },
        {
            dataField: 'remarks',
            text: 'Remarks'
        }];
        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemCode"
                                placeholder="Item Code"
                                aria-label="Item Code"
                                aria-describedby="basic-addon1"
                                readOnly
                                value={item.itemCode || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Item Barcode</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemBarcode"
                                placeholder="Item Barcode"
                                aria-label="Item Barcode"
                                aria-describedby="basic-addon2"
                                value={item.itemBarcode || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Desc.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemDesc"
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                aria-describedby="basic-addon1"
                                value={item.itemDesc || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Category</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemCategory"
                                placeholder="Item Category"
                                aria-label="Item Category"
                                aria-describedby="basic-addon1"
                                value={item.itemCategory || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemUom"
                                placeholder="Item U.O.M"
                                aria-label="Item U.O.M"
                                aria-describedby="basic-addon1"
                                value={item.itemUom || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Purchase Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="purchasePrice"
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                aria-describedby="basic-addon1"
                                value={item.purchasePrice || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Sale Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="salePrice"
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                aria-describedby="basic-addon1"
                                value={item.salePrice || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Max. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="maxStock"
                                placeholder="Max. Stock"
                                aria-label="Max. Stock"
                                aria-describedby="basic-addon1"
                                value={item.maxStock || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Min. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="minStock"
                                placeholder="Min. Stock"
                                aria-label="Min. Stock"
                                aria-describedby="basic-addon1"
                                value={item.minStock || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveStartDate"
                                placeholder="Effective Start Date"
                                aria-label="Effective Start Date"
                                aria-describedby="basic-addon1"
                                onSelect={this.handleItemChange}
                                value={item.effectiveStartDate || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveEndDate"
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                aria-describedby="basic-addon1"
                                value={item.effectiveEndDate || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>
                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.firstItem}
                                className="mr-1"
                                active>First
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.previousItem}
                                className="mr-1"
                                active>Previous
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.nextItem}
                                className="mr-1"
                                active>Next
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.lastItem}
                                className="ymr-1"
                                active>Last
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.newItem}
                                className="mr-1"
                                active>Add
                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.deleteItem}
                                className="mr-1"
                                active>Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.saveItem}
                                className="mr-1"
                                active>Save
                            </Button>
                            <Button
                                variant="primary"
                                /* disabled={navigationDtl.last}
                                onClick={this.nextItem} */
                                className="mr-1"
                                active>Undo
                            </Button>
                        </ButtonToolbar>
                    </Form>
                    <Table
                        responsive>
                        <thead>
                            <tr>
                                <th>Stock Date</th>
                                <th>Quantity</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.itemStocks && item.itemStocks.map((stock) => (
                                    // <li key={stock.itemStockId}>
                                        <tr key={stock.itemStockId}>
                                            {/* <td key={stock.itemStockId}/> */}
                                            {/* <td>{stock.itemStockDate}</td> */}
                                            <td>
                                                <FormControl
                                                    type="date"
                                                    name="itemStockDate"
                                                    placeholder="Stock Date"
                                                    aria-label="Stock Date"
                                                    aria-describedby="basic-addon1"
                                                    value={stock.itemStockDate || ''}
                                                // onChange={this.handleItemChange}
                                                />
                                            </td>
                                            <td>
                                                <FormControl
                                                    type="number"
                                                    name="qnty"
                                                    placeholder="Stock Quantity"
                                                    aria-label="Stock Quantity"
                                                    aria-describedby="basic-addon1"
                                                    value={stock.qnty || ''}
                                                // onChange={this.handleItemChange}
                                                />
                                            </td>
                                            <td>
                                                <FormControl
                                                    type="text"
                                                    name="remarks"
                                                    placeholder="Remarks"
                                                    aria-label="Remarks"
                                                    aria-describedby="basic-addon1"
                                                    value={stock.remarks || ''}
                                                // onChange={this.handleItemChange}
                                                />
                                            </td>
                                            {/* <td>{stock.qnty}</td>
                                        <td>{stock.remarks}</td> */}
                                        </tr>
                                    // </li>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Item;