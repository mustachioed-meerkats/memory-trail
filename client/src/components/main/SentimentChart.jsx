import React from 'react';
import {
  // main component 
  Chart,  
  // graphs 
  Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
  // wrappers 
  Layer, Animate, Transform, Handlers,
  // helpers 
  helpers, DropShadow, Gradient
} from 'rumble-charts';
import _ from 'lodash';
import axios from 'axios';

const series = [{
  name: 'Billy',
  data: [1, 2, 3, 5]
}, {
  name: 'Booga Booga',
  data: [5, 7, 11, 17]
}, {
  name: 'Bob',
  data: [13, 17, 19, 23]
}, {
  name: 'Bison',
  data: [21, 23, 25, 34]
}];

class SentimentChart extends React.Component {
  render() {
    return <Chart onClick={this.updateSeries} width={400} height={400} series={this.state.series} minY={0}>
      <Layer width='80%' height='80%' position='middle center'>
      <Handlers onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} optimized={false}>
        <Animate>
        <Ticks
          axis='y'
          ticks={{maxTicks: 4}}
          tickVisible={({tick}) => tick.y > 0}
          lineLength='100%'
          lineVisible={true}
          lineStyle={{stroke: 'lightgray'}}
          labelStyle={{textAnchor: 'end', alignmentBaseline: 'middle', fontSize: '0.5em', fill: 'lightgray'}}
          labelAttributes={{x: -5}}
        />
        <Ticks
          axis='x'
          label={({tick}) => tick.x + 1}
          labelStyle={{textAnchor:'middle',alignmentBaseline:'before-edge',fontSize:'0.5em',fill:'lightgray'}}
          labelAttributes={{y: 3}}
        />
        <Bars
          groupPadding='3%'
          innerPadding='0.5%'
          barAttributes={{
            onMouseMove: e => e.target.style.fillOpacity = 1,
            onMouseLeave: e => e.target.style.fillOpacity = 0.5
          }}
          barStyle={{
            fillOpacity: 0.5,
            // transition: 'all 250ms'
          }}
        />
        <Lines />
        <Dots className='dots' dotStyle={{transition:'all 250ms',fillOpacity:0}} />
        <Labels
        className='labels'
        label={({point}) => Math.round(point.y)}
        dotStyle={{
          alignmentBaseline:'after-edge',
          textAnchor:'middle',
          display:'none'
        }}
      />
        </Animate>
      </Handlers>
      </Layer>
    </Chart>;
  }
  constructor() {
    super();
    this.state = {series};
    this.updateSeries = () => {
      const series = _.map(_.range(1), index => ({
        data: _.map(_.range(6), index => Math.random() * 100)
      }));
      // const arr = _.range(this.state.series.length);
      // arr.push(this.state.series.length);
      // const series = [{
      //   data: arr
      // }];

      this.setState({series});
    };

    let hovered = null;
    const hideHovered = () => {
      if (hovered && hovered.circle) {
        hovered.circle.setAttribute('r', hovered.radius);
        hovered.circle.style.fillOpacity = hovered.opacity;
        if (hovered.label) {
          hovered.label.style.display = 'none';
        }
      }
    };

    this.handleMouseMove = ({closestPoints}) => {
      const closest = closestPoints[0];
      if (!closest) {
        return;
      }
      const {seriesIndex, pointIndex} = closest;
      const circle = document.querySelector(`circle.dots-circle-${seriesIndex}-${pointIndex}`);
      if (!circle) {
        return;
      }
      hideHovered();
      const label = document.querySelector(`.labels-label-${seriesIndex}-${pointIndex}`);
      hovered = {circle, label, radius: circle.getAttribute('r'), opacity: circle.style.fillOpacity};
      circle.setAttribute('r', 10);
      circle.style.fillOpacity = 1;
      if (label) {
        label.style.display = 'block';
      }
    };

    this.handleMouseLeave = () => {
      hideHovered();
    };
  }

  componentDidMount() {
    axios.get('/api/posts/user/6')
      .then(results => {
        console.log(results);
        var arr = results.data.map(post => {
          return parseFloat(post.magnitude);
        });
        var dataz = [{
          data: arr
        }];
        this.setState({series: dataz});
      });
  }
}

export default SentimentChart;