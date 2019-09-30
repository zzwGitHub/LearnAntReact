import React from 'react';
import {Table, Modal, Button, Form, Input} from 'antd';
import { connect } from 'dva';
import SampleChart from '../../components/SampleChart';

const FormItem = Form.Item;

const namespace = 'booktable';

const mapStateToProps = (state) => {
  const books = state[namespace].data;
  return {
    p_books: books,
    p_statistics: state[namespace].statistics,
    ld : state.loading.effects['booktable/initBooks'],
    ld_addbook : state.loading.effects['booktable/addBook'],
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



@connect(mapStateToProps, mapDispatchToProps)
class BookTable extends React.Component {
    state = {
        visible: false,
        statisticVisible: false,
        id: null,
    }

    constructor(props){
      super(props);
      
      
    }

    columns = [
      {
          title: '书名',
          dataIndex: 'name',
          width: 250,
      },
      {
          title: '作者',
          dataIndex: 'author',
          width: 250,
      },
      {
          title: '价格',
          dataIndex: 'price',
      },
      {
        title: '',
        dataIndex: '_',
        render: (_, { id }) => {
          
          return (
            <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
          );
        },
      },
    ];

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

    showStatistic = (id) => {
      this.props.dispatch({
        type: `${namespace}/getStatistic`,
        payload: id,
      });
      // 更新 state，弹出包含图表的对话框
      this.setState({ id, statisticVisible: true });
    };
  
    handleStatisticCancel = () => {
      this.setState({
        statisticVisible: false,
      });
    }
    
    render() {


      // this.setState((prestate, props) =>{
      //   return {
      //     ...prestate,
      //     visible: props.ld_addbook
      //   }
      // });

        const { visible,statisticVisible, id } = this.state;
        const { form: { getFieldDecorator }, p_statistics  } = this.props;

        return (
          <div>
            <Table loading={this.props.ld} columns={this.columns} dataSource={this.props.p_books} pagination={{ pageSize: 50 }} scroll={{ y: 340 }} />
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
            <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
              <SampleChart data={p_statistics[id]} />
            </Modal>
          </div>
        );
    }
}
export default connect(mapStateToProps)(Form.create()(BookTable));







