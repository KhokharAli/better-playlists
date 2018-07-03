import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: "Ali",
    playLists: [
      {
        name: 'Current Favourites',
        songs: [
          {name: 'Clouded', duration: 1345},
          {name: 'Indie Film Lovers', duration: 2325},
          {name: 'Moody', duration: 4644}
        ]
      },
      {
        name: '2017 Favourites',
        songs: [
          {name: 'With Me ', duration: 2342},
          {name: 'Hometown Girl', duration: 6332},
          {name: 'Make You Feel', duration: 7654}
        ]
      },
      {
        name: '2016 Favourites',
        songs: [
          {name: 'Tree', duration: 7864},
          {name: 'Hello Film Lovers', duration: 4535},
          {name: 'Lamp', duration: 1232}
        ]
      },
      {
        name: '2015 Favourites',
        songs: [
          {name: 'Table', duration: 3343},
          {name: 'Chair Dreamers', duration: 2533},
          {name: 'Painters', duration: 1395}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style = {{...defaultStyle, width: "40%", display: 'inline-block'}}> 
        <h2> {this.props.playLists.length} Playlists </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playLists.reduce((songs, eachPlayList) => {
      return songs.concat(eachPlayList.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0) 
    return (
      <div style = {{...defaultStyle, width: "40%", display: 'inline-block'}}> 
        <h2> {Math.round(totalDuration/60)} Hours </h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style = {{defaultStyle}}>
        <img/>
        <input type="Text" onKeyUp={event => 
            this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    let playLists = this.props.playLists
    return (
      <div style = {{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img/>
        <h3> {playLists.name} </h3>
        <ul>
          {playLists.songs.map(song =>
          <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let playListsToRender = this.state.serverData.user ? this.state.serverData.user.playLists
    .filter(playLists =>
      playLists.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
    ): []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style= {{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playLists={playListsToRender}/>
          <HoursCounter playLists={playListsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playListsToRender.map(playLists => 
           <Playlist playLists={playLists}/>
          )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;