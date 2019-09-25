// import React from 'react';
// import {Table, Modal, Button, Form, Input} from 'antd';


// const FormItem = Form.Item;

// class YQForm extends React.Component{

//     state = {
//         visible: false,
//     }

//     showModal = () => {
//         this.setState({ visible: true });
//     };

//     handleCancel = () => {
//         this.setState({
//           visible: false,
//         });
//       }

//     render(){
//         const { visible } = this.state;
//         const { form: { getFieldDecorator } } = this.props;
//         return (
//             <div>
//                 <Table />

//                 <Button onClick={this.showModal}>新建</Button>
//                 <Modal title="新建记录" visible={this.state.visible}>
//                     <Form>
//                         <FormItem label="名称">
//                             {getFieldDecorator('name', {
//                                 rules: [{ required: true }],
//                             })(
//                                 <Input />
//                             )}
//                         </FormItem>
//                         <FormItem label="描述">
//                             {getFieldDecorator('desc')(
//                                 <Input />
//                             )}
//                         </FormItem>
//                         <FormItem label="链接">
//                             {getFieldDecorator('url', {
//                                 rules: [{ type: 'url' }],
//                             })(
//                                 <Input />
//                             )}
//                         </FormItem>
//                     </Form>
//                 </Modal>
//             </div>
//         );
//     }
// }
// export default connect(mapStateToProps)(Form.create()(YQForm));