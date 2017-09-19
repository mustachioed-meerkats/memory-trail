import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

class SentimentChart extends React.Component {
  constructor() {
    super();
    this.state = {
      series: [],
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
    this.generateSeries(this.props.story);
  }

  componentWillReceiveProps(nextProps) {
    this.generateSeries(nextProps.story);
  }

  generateSeries(story) {
    var data = story.posts.map(post => {
      return Number(post.score) * Number(post.magnitude);
    });
    var landmark_names = story.posts.map(post => {
      return post.landmark_name || 'Oakland';
    });
    this.setState({
      series: [{
        data: data,
        landmark_name: landmark_names
      }],
    });
  }

  render() {
    return (
    <div style={{fontFamily:'sans-serif',fontSize:'2em'}}>
      <Chart width={1600} height={800} series={this.state.series} minY={-3} maxY={3}>
        <Layer width='80%' height='80%' position='middle center'>
        <Handlers onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} optimized={false}>
          <Animate _ease='bounce' _ease='elastic'>
          <Ticks
            axis='y'
            ticks={{maxTicks: 7}}
            tickVisible={({tick}) => tick.y >= -3}
            lineLength='100%'
            lineVisible={true}
            lineStyle={{stroke: 'lightgray'}}
            labelStyle={{textAnchor: 'end', alignmentBaseline: 'middle', fontSize: '0.5em', fill: 'lightgray'}}
            labelAttributes={{x: -5}}
          />
          <Ticks
            axis='x'
            label={({index, props}) => props.series[0].landmark_name[index]}
            labelStyle={{textAnchor:'middle',alignmentBaseline:'before-edge',fontSize:'0.5em',fill:'lightgray'}}
            labelAttributes={{y: 3}}
          />
          <Lines />
          <Dots className='dots' dotStyle={{transition:'all 250ms',fillOpacity:0}} />
          <Labels
          className='labels'
          label={({point}) => Number(point.y.toFixed(1))}
          dotStyle={{
            alignmentBaseline:'after-edge',
            textAnchor:'middle',
            display:'none'
          }}
        />
          </Animate>
        </Handlers>
        </Layer>
      </Chart>
    </div>);
  }
}


const mapStateToProps = (state) => ({
  userStories: state.user.stories
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentimentChart);