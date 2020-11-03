import React from 'react'
const Header = ({ titles, selectTab, defaultTab }) => {
  const handleClick = e => selectTab(Number(e.target.id));
  const tabs = titles.map((title, idx) => (
    <li key={idx} id={idx} className={(idx === defaultTab) ? 'active' : ''} onClick={handleClick}>
        {title}
    </li>
    )
  );
  return (
    <ul className='tab-header'>
      {tabs}
    </ul>
  )
}

class Folder extends React.Component {
  constructor(props) { super(props);
      this.state = { defaultTab: 0 }
  }
  selectTab = index => this.setState({ defaultTab: index });
  render(props) {
    const folderChosen = this.props.folders[this.state.defaultTab];
    const titles = this.props.folders.map(folder => folder.title);
    return (
      <>
        <h1>Folder</h1>
        <div className="tabs">
          <Header defaultTab={this.state.defaultTab} titles={titles} selectTab={this.selectTab} />
          <div className="tab-content">
            {folderChosen.content}
          </div>
        </div>
      </>
    )
  }
}

export default Folder;
