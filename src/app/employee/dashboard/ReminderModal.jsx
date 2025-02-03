import React from "react";
import { Modal, Form, Row, Col, Input, DatePicker } from "antd";
import AntButton from "../../../app/hrdepartment/common/Button";

const ReminderModal = ({ visible, onCancel, onSubmit, form }) => {
  return (
    <Modal
      title="Reminder"
      open={visible} // Updated to use `open` instead of `visible`
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={[16, 16]}>
          {/* Reminder Title */}
          <Col span={12}>
            <Form.Item
              label="Reminder Title"
              name="title"
              rules={[{ required: true, message: "Reminder title is required" }]}
            >
              <Input placeholder="Enter reminder title" aria-label="Reminder Title" />
            </Form.Item>
          </Col>

          {/* Reminder Date */}
          <Col span={12}>
            <Form.Item
              label="Reminder Date"
              name="date"
              rules={[{ required: true, message: "Reminder date is required" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select a date"
                aria-label="Reminder Date"
              />
            </Form.Item>
          </Col>

          {/* Details */}
          <Col span={24}>
            <Form.Item
              label="Details"
              name="details"
              rules={[{ required: true, message: "Details are required" }]}
            >
              <Input.TextArea
                placeholder="Enter details about the reminder"
                rows={4}
                aria-label="Reminder Details"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Buttons */}
        <Row justify="end">
          <Col>
            <AntButton type="default" onClick={onCancel}>
              Cancel
            </AntButton>
            <AntButton type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              Submit
            </AntButton>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ReminderModal;




// import React from "react";
// import { Modal, Form, Row, Col, Input, DatePicker } from "antd";
// import AntButton from "@/app/hrdepartment/common/Button";

// const ReminderModal = ({ visible, onCancel, onSubmit, form }) => {
//   return (
//     <Modal
//       title="Reminder"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//       width={700}
//     >
//       <Form form={form} layout="vertical" onFinish={onSubmit}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               label="Reminder Title"
//               name="title"
//               rules={[{ required: true, message: "Reminder title is required" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               label="Reminder Date"
//               name="date"
//               rules={[{ required: true, message: "Reminder date is required" }]}
//             >
//               <DatePicker />
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item
//               label="Details"
//               name="details"
//               rules={[{ required: true, message: "Details are required" }]}
//             >
//               <Input.TextArea />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row>
//           <Col span={24} style={{ textAlign: "right" }}>
//             <AntButton type="default" onClick={onCancel}>
//               Cancel
//             </AntButton>
//             <AntButton type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
//               Submit
//             </AntButton>
//           </Col>
//         </Row>
//       </Form>
//     </Modal>
//   );
// };

// export default ReminderModal;
