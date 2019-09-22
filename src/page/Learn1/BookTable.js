import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';


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
    
    componentDidMount() {
        this.props.onDidMount();

    }
    
    render() {
        return (
            <Table loading={this.props.ld} columns={columns} dataSource={this.props.p_books} pagination={{ pageSize: 50 }} scroll={{ y: 340 }} />
        );
    }
}

export default BookTable;







