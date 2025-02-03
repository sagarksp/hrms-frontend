import React from "react";
import { Steps, Form, Button, Typography } from "antd";

const { Step } = Steps;
const { Text } = Typography;

const StepsForm = ({
  steps,
  currentStep,
  form,
  onFinish,
  prev,
  next,
  goToStep,
}) => {
  return (
    <div style={{ paddingBottom: "3px" }}>
      
      <Steps
        current={currentStep}
        style={{ background: "#f8edeb", padding: "40px", width: "100%" }}
      >

        {steps.map((item, index) => (
          <Step
            key={item.title}
            icon={item.icon}
            onClick={() => goToStep(index)}
          />
        ))}

      </Steps>

       {/* text */}
        <div style={{ display: "flex", alignItems: "center", position: "relative", top: -35, right: 6,}} >
        {steps.map((item) => (
            <Text
            key={item.title}
            style={{
                flex: "1",
                textAlign: "center",
                fontWeight: 500,
                color: "#a78a7f",
            }}
            >
            {item.title}
            </Text>
        ))}
        </div>
        
      <br />

       {/* Main Form */}
      <Form
        form={form}
        name="employee_form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {/* content */}
        {steps[currentStep].content}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>

    </div>
  );
};

export default StepsForm;















 // <div style={{ paddingBottom: "30px" }}>
       

 
    //   <Steps current={currentStep}
    //     style={{ background: "#f8edeb", padding: "40px", width: "100%" }}
    //   >
    //     {steps.map((item, index) => (
    //       <Step
    //         key={item.title}
    //         icon={item.icon}
    //         onClick={() => goToStep(index)}
    //       />
    //     ))}
    //   </Steps>

    //   <div style={{ display: "flex", alignItems: "center",position: "relative",top: -35,right: 6 }} >
    //     {steps.map((item, index) => (
    //       <Text
    //         key={item.title}
    //         style={{ flex: "1", textAlign: "center", fontWeight: 500, color: "#a78a7f"}}
    //       >
    //         {item.title}
    //       </Text>
    //     ))}
    //   </div>
    //   <br />



    //   <Form
    //     form={form}
    //     name="employee_form"
    //     //   initialValues={{ gender: "Male" }}
    //     onFinish={onFinish}
    //     labelCol={{ span: 8 }}
    //     wrapperCol={{ span: 16 }}
    //   >
    //     {steps[currentStep].content}
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginTop: "20px",
    //       }}
    //     >
    //       {currentStep > 0 && (
    //         <Button style={{ margin: "0 8px" }} onClick={prev}>
    //           Previous
    //         </Button>
    //       )}
    //       {currentStep < steps.length - 1 && (
    //         <Button type="primary" onClick={next}>
    //           Next
    //         </Button>
    //       )}
    //       {currentStep === steps.length - 1 && (
    //         <Button type="primary" htmlType="submit">
    //           Submit
    //         </Button>
    //       )}
    //     </div>
    //   </Form>
    // </div>