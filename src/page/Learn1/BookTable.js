import React from 'react';
import {Table, Modal, Button, Form, Input} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const namespace = 'booktable';

const mapStateToProps = (state) => {
  const books = state[namespace].data;
  return {
    p_books: books,
    ld : state.loading.effects['booktable/initBooks']
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/initBooks`,
      });
    },
  };
};

const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: '作者',
        dataIndex: 'author',
        width: 150,
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
];
  
// const data = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }

@connect(mapStateToProps, mapDispatchToProps)
class BookTable extends React.Component {
    state = {
        visible: false,
    }

    //周期函数
    componentDidMount() {
      this.props.onDidMount();

    }

    showModal = () => {
      this.setState({ visible: true });
    };

    handleCancel = () => {
      this.setState({
        visible: false,
      });
    }

    handleOk = () => {
      const { dispatch, form: { validateFields } } = this.props;
    
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: `${namespace}/addBook`,
            payload: values,
          });
          // 重置 `visible` 属性为 false 以关闭对话框
          this.setState({ visible: false });
        }
      });
    }

    
    
    render() {
        const { visible } = this.state;
        const { form: { getFieldDecorator } } = this.props;
        return (
          <div>
            <Table loading={this.props.ld} columns={columns} dataSource={this.props.p_books} pagination={{ pageSize: 50 }} scroll={{ y: 340 }} />
            <Button onClick={this.showModal}>新建</Button>
            <Modal title="新建记录" visible={this.state.visible} onCancel={this.handleCancel} onOk={this.handleOk}>
                <Form>
                    <FormItem label="书名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="作者">
                        {getFieldDecorator('author')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="价格">
                        {getFieldDecorator('price', {
                            rules: [{ type: 'string' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
          </div>
        );
    }
}
export default connect(mapStateToProps)(Form.create()(BookTable));







