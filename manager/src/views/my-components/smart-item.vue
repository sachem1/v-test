<script>
import Vue from "vue";
import subselect from "./../my-components/sub-select.vue";
import condition from "./../my-components/condition.vue";
import subRadio from "./../my-components/sub-radio.vue";
import parameters from "./../my-components/parameters.vue";
Vue.component("subselect", subselect);
Vue.component("condition", condition);
Vue.component("subradio", subRadio);
Vue.component("parameters", parameters);
export default {
  name: "smart-item",
  functional: true,
  render: function(createElement, context) {
    function getComponent() {
      return createComponent(context.props.data);
    }

    if (context.props.data.type === "section")
      return createElement(
        DividerControl,
        {
          props: {
            data: context.props.data
          }
        },
        context.children
      );

    return createElement(
      getComponent(),
      {
        props: {
          data: context.props.data,
          model: context.props.model,
          enums: context.props.enums
        }
      },
      context.children
    );
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    enums: {
      type: Object,
      required: false
    }
  }
};

function wraperLable(v) {
  return v + "：";
}

function wrapperModelProp(p) {
  return "editingModel." + p;
}

function getInlineDivData() {
  return {
    style: {
      display: "inline-block",
      width: "400px"
    }
  };
}

function getFormItemProps(data) {
  return {
    label: wraperLable(data.label),
    prop: data.prop,
    "label-width": 150
  };
}

function createComponent(data) {
  if (data.type === "number") return NumberInputControl;
  if (data.type === "date") return DateControl;
  if (data.type === "enum")
    //下拉菜单
    return SelectControl;
  if (data.type === "shortenum")
    //单选框组
    return RadioControl;
  if (data.type === "bool") return SwitchControl;
  if (data.type === "longtext") return MultiLineTextInputControl;
  if (data.type === "condition") return ConditionControl;
  if (data.type === "readonly") return ReadonlyInputControl;
  if (data.type === "parameters") return ParametersControl;

  return TextInputControl;
}

const ReadonlyInputControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    var displayText = "";
    if (
      !this.model.hasOwnProperty(this.data.prop) &&
      this.$route.query.hasOwnProperty(this.data.prop)
    ) {
      displayText = this.$route.query[this.data.prop];
    } else {
      displayText = this.model[this.data.prop];
    }

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("span", {}, displayText)
        ])
      ]
    );
  }
};

const TextInputControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    var propsBuffer = {
      value: this.model[this.data.prop]
    };

    if (this.data.maxLength != undefined)
      propsBuffer["maxlength"] = this.data.maxLength;

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("Input", {
            props: propsBuffer,
            on: {
              input: newValue => {
                __this.model[this.data.prop] = newValue;
              }
            }
          })
        ])
      ]
    );
  }
};

const DividerControl = {
  props: ["data"],
  render: function(createElement, context) {
    return createElement(
      "div",
      {
        class: {
          "ivu-divider": true,
          "ivu-divider-horizontal": true,
          "ivu-divider-with-text-center": true
        }
      },
      [
        createElement(
          "span",
          {
            class: {
              "ivu-divider-inner-text": true
            }
          },
          this.data.label
        )
      ]
    );
  }
};

const MultiLineTextInputControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("Input", {
            props: {
              type: "textarea",
              value: this.model[this.data.prop],
              rows: 2
            },
            on: {
              input: newValue => {
                __this.model[this.data.prop] = newValue;
              }
            }
          })
        ])
      ]
    );
  }
};

const NumberInputControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("InputNumber", {
            props: {
              value: this.model[this.data.prop]
            },
            on: {
              "on-change": newValue => {
                __this.model[this.data.prop] = newValue;
              }
            }
          })
        ])
      ]
    );
  }
};

const RadioControl = {
  props: ["data", "model"],
  render(createElement) {
    var __this = this;
    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("subradio", {
            props: {
              modelValue: this.model[this.data.prop],
              options: this.data.__options
            },
            on: {
              "on-change": newValue => {
                __this.model[__this.data.prop] = newValue;
              }
            }
          })
        ])
      ]
    );
  }
};

const SelectControl = {
  props: ["data", "model", "enums"],
  render: function(createElement) {
    var __this = this;

    var options = [];
    if (this.data.hasOwnProperty("enumName")) {
      var options = this.enums[this.data.enumName].map(item => {
        return createElement(
          "Option",
          {
            props: {
              value: item.value
            }
          },
          item.label
        );
      });

      return createSelectControl(
        createElement,
        this.data,
        this.model,
        options,
        __this
      );
    } else if (this.data.hasOwnProperty("enumUrl")) {
      return createElement(
        "FormItem",
        {
          props: getFormItemProps(this.data)
        },
        [
          createElement("div", getInlineDivData(), [
            createElement("subselect", {
              props: {
                modelValue: this.model[this.data.prop],
                options: this.data.__options,
                labelInValue: this.data.hasOwnProperty("labelProp"),
                clearable: !this.data.required
              },
              on: {
                "on-change": newValue => {
                  if (__this.data.hasOwnProperty("labelProp")) {
                    __this.model[__this.data.prop] = newValue
                      ? newValue.value
                      : null;
                    __this.model[__this.data.labelProp] = newValue
                      ? newValue.label
                      : null;
                  } else {
                    __this.model[__this.data.prop] = newValue;
                  }
                }
              }
            })
          ])
        ]
      );
    }
  }
};

function createSelectControl(createElement, data, model, options, __this) {
  return createElement(
    "FormItem",
    {
      props: getFormItemProps(data)
    },
    [
      createElement("div", getInlineDivData(), [
        createElement(
          "Select",
          {
            props: {
              value: model[data.prop],
              clearable: !data.required,
              transfer: true
            },
            on: {
              "on-change": newValue => {
                __this.model[data.prop] = newValue;
              }
            }
          },
          options
        )
      ])
    ]
  );
}

const DateControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    var propsBuffer = {
      value: this.model[this.data.prop]
    };

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement("DatePicker", {
            props: propsBuffer,
            on: {
              "on-change": newValue => {
                __this.model[this.data.prop] = newValue;
              }
            }
          })
        ])
      ]
    );
  }
};


const SwitchControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    return createElement(
      "FormItem",
      {
        props: getFormItemProps(this.data)
      },
      [
        createElement("div", getInlineDivData(), [
          createElement(
            "iSwitch",
            {
              props: {
                value: this.model[this.data.prop],
                size: "large"
              },
              on: {
                "on-change": newValue => {
                  __this.model[this.data.prop] = newValue;
                }
              }
            },
            [
              createElement(
                "span",
                {
                  slot: "open"
                },
                "是"
              ),
              createElement(
                "span",
                {
                  slot: "close"
                },
                "否"
              )
            ]
          )
        ])
      ]
    );
  }
};

const ConditionControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    return createElement(
      "FormItem",
      {
        props: {
          prop: this.data.prop,
          "label-width": 0
        },
        style: {
          width: "100%",
          clear: "both"
        },
        class: {
          fullWidth: true
        }
      },
      [
        createElement(
          "condition",
          {
            props: {
              conditions: this.model[this.data.extendProp],
              value: this.model[this.data.prop],
              propertyFilter: this.data.propertyFilter
            },
            on: {
              "on-change": newValue => {
                __this.model[this.data.extendProp] = newValue;
              },
              "on-expression-change": newExpression => {
                __this.model[this.data.prop] = newExpression;
              }
            }
          },
          []
        )
      ]
    );
  }
};

const ParametersControl = {
  props: ["data", "model"],
  render: function(createElement, context) {
    var __this = this;

    return createElement(
      "FormItem",
      {
        props: {
          prop: this.data.prop,
          "label-width": 0
        },
        style: {
          width: "100%",
          clear: "both"
        },
        class: {
          fullWidth: true
        }
      },
      [
        createElement(
          "parameters",
          {
            props: {
              parameters: this.model[this.data.extendProp],
              value: this.model[this.data.prop],
              propertyFilter: this.data.propertyFilter
            },
            on: {
              "on-change": newValue => {
                __this.model[this.data.extendProp] = newValue;
              },
              "on-expression-change": newExpression => {
                __this.model[this.data.prop] = newExpression;
              }
            }
          },
          []
        )
      ]
    );
  }
};
</script>