<script>
export default {
  name: "search-item",
  functional: true,
  render: function(createElement, context) {
    function getComponent() {
      var data = context.props.data;
      if (data.type === "enum") return SelectSearchControl;
      if (data.type === "daterange") {
        return DateRangeControl;
      }

      return TextSearchControl;
    }

    return createElement(
      getComponent(),
      {
        props: {
          data: context.props.data,
          model: context.props.model,
          enums: context.props.enums,
          bus: context.props.bus
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
    },
    bus: {
      type: Object,
      required: false
    }
  }
};

const TextSearchControl = {
  props: ["data", "model", "bus"],
  render: function(createElement, context) {
    var __this = this;
    
    var propsBuffer = {
      value: this.model[this.data.prop],
      placeholder: this.data.label,
      bus: this.bus
    };

    if (this.data.maxLength != undefined)
      propsBuffer["maxlength"] = this.data.maxLength;

    return createElement("Input", {
      props: propsBuffer,
      on: {
        input: newValue => {
          __this.model[__this.data.prop] = newValue;
        },
        "on-enter": () => {
          __this.bus.$emit("on-search");
        }
      }
    });
  }
};

const DateRangeControl = {
  props: ["data", "model", "bus"],
  render: function(createElement, context) {
    var __this = this;
    var propsBuffer = {
      value: this.model[this.data.prop],
      placeholder: this.data.label,
      bus: this.bus,
      type: "daterange"
    };

    return createElement("DatePicker", {
      props: propsBuffer,
      on: {
        "on-change": newValue => {
          __this.model[this.data.prop] = newValue[0];
          __this.model[this.data.extendProp] = newValue[1];
        }
      }
    });
  }
};

const SelectSearchControl = {
  props: ["data", "model", "enums"],
  render: function(createElement) {
    var __this = this;

    var __options = [];
    if (this.data.enumName) {
      __options = this.enums[this.data.enumName];
    } else {
      __options = this.data.__options;
    }

    var label = "";
    if (this.data.label) label = this.data.label;

    return createElement(
      "Select",
      {
        props: {
          value: this.model[this.data.prop],
          placeholder: "请选择" + label,
          clearable: true
        },
        on: {
          "on-change": newValue => {
            __this.model[this.data.prop] = newValue;
          }
        }
      },
      __options.map(item => {
        return createElement(
          "Option",
          {
            props: { value: item.value }
          },
          item.label
        );
      })
    );
  }
};
</script>