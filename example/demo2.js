var React = require('react-native');
var {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

var Router = require('react-native-custom-navigation');
var imageArray = [
  'https://divnil.com/wallpaper/iphone5/img/app/c/l/clear-your-desktop-wallpaper-for-640x1136-iphone-5-311-46_33a8356f2205d7c0be8727720a21a207_raw.jpg',
  'http://live-wallpaper.net/iphone5s/img/app/i/p/iphone5_ios7_01869_40f81d87eba8242eb9d1d777aa0f620a_raw.jpg',
  'http://3.bp.blogspot.com/-6sBo91tPiXU/UHx6TZMG4CI/AAAAAAAAIyw/RCTivAH6dVk/s1600/iphone-5-wallpapers-01.png',
  'http://live-wallpaper.net/iphone5s/img/app/c/0/c0dc6d89f28ea771d0af7167236a5117_raw.jpg'
];

var navbarColors = [
  '#acc7bf',
  '#5e5f67',
  '#c37070',
  '#eae160',
  '#bf7aa3',
  '#b7d967'
];

var NavbarContent = require('./navbar');
var screen = require('Dimensions').get('window');

var Navbar = React.createClass({
  getInitialState() {
    return {
      progress: 0
    };
  },

  componentWillReceiveProps(newProps) {
    var progress;
    var n = Math.abs(newProps.fromIndex - newProps.toIndex) * newProps.progress;
    if (newProps.toIndex > newProps.fromIndex) {
      progress = (newProps.fromIndex + n) * 0.2 ;
    } else {
      progress = (newProps.fromIndex - n) * 0.2 ;
    }

    this.setState({
      progress : progress
    });
  },

  render() {
    var width = this.state.progress * 300;
    return (
      <View
        style={styles.navbar}>
        <View style={styles.axisView}>
          <View style={[styles.progress, {width: width}]}/>
        </View>
      </View>
      );
  }
});

var RootController = React.createClass({
  render() {
    return (
      <Router
        navbarComponent={Navbar}
        initialRoute={{
          component: DemoView,
        }}/>);
  }
});

var DemoView = React.createClass({
  render() {
    var imageIndex = this.props.route.index % imageArray.length;
    var imageUri = imageArray[imageIndex];

    return (
      <View style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: imageUri}}>
            <TouchableHighlight
              style={styles.button}
              onPress={this._pushToNext}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Push</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._back}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this._popToTop}>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>Pop to top </Text>
              </View>
            </TouchableHighlight>
          </Image>
      </View>
    )
  },

  _back() {
    this.props.route.pop();
  },

  _pushToNext() {
    if (this.props.route.index > 4) {
      return;
    }

    this.props.route.push({
      component: DemoView,
    });
  },

  _popToTop() {
    this.props.route.popToTop();
  },
});

var styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: screen.height,
  },

  buttonView: {
    justifyContent: 'center',
    padding: 4,
    width: 180,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4
  },

  button: {
    marginBottom: 40
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)'
  },

  image: {
    alignItems: 'center',
    width: screen.width,
    height: screen.height,
    justifyContent: 'center'
  },

  navbar: {
    width:screen.width,
    height: 64,
    backgroundColor: '#5e5f67',
    justifyContent: 'center'
  },

  axisView: {
    marginTop: 20,
    width: 300,
    height: 8,
    borderRadius: 4,
    backgroundColor : '#fff',
    alignSelf: 'center',
    justifyContent: 'center'
  },

  progress: {
    alignSelf: 'flex-start',
    backgroundColor: '#b7d967',
    height: 6,
    borderRadius: 3,
  }
});

module.exports = RootController;