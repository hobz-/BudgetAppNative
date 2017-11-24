import React, { Component } from 'react';
import { View, Text, ART } from 'react-native';

const {
  Surface,
  Group,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
//import AnimShape from '../art/AnimShape';
import Theme from './styles/pietheme';

const d3 = { scale, shape };

import { scaleBand, scaleLinear } from 'd3-scale';

class PieChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {"number":  8, "name": 'Fun activities'},
        {"number": 7, "name": 'Dog'},
        {"number": 16, "name": 'Food'},
        {"number": 23, "name": 'Car'},
        {"number": 42, "name": 'Rent'},
        {"number":  4, "name": 'Misc'},
      ]
    }

    this._value = this._value.bind(this);
    this._getColor = this._getColor.bind(this);
    this.getSvgPaths = this.getSvgPaths.bind(this);
  }

  _value(item) { return item.number; }

  _getColor(index) { return Theme.colors[index]; }

  getSvgPaths() {
    arcs = d3.shape.pie().value(this._value)(this.state.data);
    svgPaths = [];

    arcs.forEach((arc) => {
      svgPaths.push(d3.shape.arc()
                   .outerRadius(this.props.pieWidth/2)
                   .padAngle(.05)
                   .innerRadius(30)
                   (arc))
    });

    console.log(svgPaths);

    return svgPaths;
  }

  render() {
    const margin = 20;
    const x = this.props.pieWidth / 2 + margin;
    const y = this.props.pieHeight / 2 + margin;


    return(
      <Surface width={this.props.width} height={this.props.height}>
        <Group x={x} y={y}>
          {
            this.getSvgPaths().map((item, index) => {
              <Shape
                key={'pie_shape_' + index}
                stroke={this._getColor(index)}
                fill={this._getColor(index)}
                strokeWidth={3}
                d={item}
                />
            })
          }
        </Group>
      </Surface>
    );
  }
}

export default PieChart;
