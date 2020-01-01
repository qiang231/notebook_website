import React, { useState } from 'react'
import { Link } from 'gatsby'

import Tree from '../../../Tree'

import { TemplateContext } from '../../../../templates/notebook'
import list from '../../../../../content/sidebar.yml'

import cns from 'classnames'
import styl from './index.module.scss'

function Sidebar({ location }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  const treeData = {
    id: -1,
    children: createTree(list),
  }

  function handleToggleSideBar() {
    setSideBarIsOpen(!sideBarIsOpen)
  }

  const paths = location.pathname.split('/')
    .filter(Boolean)
    .map((item) => window.decodeURIComponent(item))

  return (
    <>
      <nav
        className={cns(
          'sidebar',
          'hidden-xs',
          'hidden-sm',
          styl.sidebar,
          { [styl.open]: sideBarIsOpen },
        )}
      >
        <Tree
          className={styl.content}
          treeClassName="theme-tree"
          nodeClassName="theme-tree-node"
          activeID={findActiveID(treeData, paths)}
          node={treeData}
          nodeCreator={
            node => node.context
              ? <Link to={node.context.path} title={node.label} className={styl.label}>{node.label}</Link>
              : <span title={node.label} className={styl.label}>{node.label}</span>
          }
        />
      </nav>

      <div
        className={cns(
          'hidden-lg',
          { 'theme-color': sideBarIsOpen },
          styl.toggleButton,
        )}
        onClick={handleToggleSideBar}
      >
        <i className="fa fa-align-right"/>
      </div>
    </>
  )
}

export default () => (
  <TemplateContext.Consumer>
    {context => <Sidebar location={context.location} />}
  </TemplateContext.Consumer>
)

function createTree(list, idPrefix = '', relativePath = '/') {
  const buildPath = label => relativePath + label + '/'

  return list.map((item, index) => {
    const id = [idPrefix, String(index)].filter(Boolean).join('-')

    if (typeof item === 'string') {
      return {
        id,
        label: item,
        context: {
          path: buildPath(item),
        },
      }
    }

    const [label, value] = Object.entries(item)[0]
    return {
      id,
      label,
      children: createTree(value, id, buildPath(label)),
    }
  })
}

function findActiveID(tree, paths, pathIndex = 0) {
  const path = paths[pathIndex]

  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i]
    if (child.label === path) {
      if (child.children) {
        return findActiveID(child, paths, pathIndex + 1)
      }

      return child.id
    }
  }

  return -1
}
