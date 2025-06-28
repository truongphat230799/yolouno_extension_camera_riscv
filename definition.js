Blockly.Blocks['init_camera_uart'] = {
  init: function () {
    this.jsonInit({
      type: "init_camera_uart",
      message0: "khởi tạo camera UART TX %1 RX %2 baudrate %3",
      args0: [
          {
            type: "field_dropdown",
            name: "RX",
            "options": digitalPins
          },
          {
            "type": "field_dropdown",
            "name": "TX",
            "options": digitalPins
          },
          {
            "type": "field_number",
            "name": "BAUDRATE",
            "value": 115200
          }
        ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
      tooltip: "Khởi tạo kết nối camera qua UART",
      helpUrl: ""
    });
  }
};

Blockly.Python['init_camera_uart'] = function(block) {
  Blockly.Python.definitions_['import_riscv_camera'] = 'from camera_riscv import *';
  const baudrate = block.getFieldValue('BAUDRATE');
  const tx = block.getFieldValue('TX');
  const rx = block.getFieldValue('RX');
  return `cam = CameraUART(baudrate=${baudrate}, tx=${tx}_PIN, rx=${rx}_PIN)\n`;
};


Blockly.Blocks['get_camera_data'] = {
  init: function () {
    this.jsonInit({
      type: "get_camera_data",
      message0: "lấy dữ liệu %1 từ camera",
      args0: [
        {
          type: "field_dropdown",
          name: "FIELD",
          options: [
            ["label", 0],
            ["x", 1],
            ["y", 2],
            ["h", 3],
            ["w", 4]
          ]
        }
      ],
      output: "String",
      colour: 230,
      tooltip: "Trả về giá trị được chọn từ dữ liệu camera",
      helpUrl: ""
    });
  }
};

Blockly.Python['get_camera_data'] = function(block) {
  const field = block.getFieldValue('FIELD');
  return [`cam.get_data("${field}")`, Blockly.Python.ORDER_ATOMIC];
};


