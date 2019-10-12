import { Component } from "react";
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return "aaaa" + this.props.title;
  }
}
