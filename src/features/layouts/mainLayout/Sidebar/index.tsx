import React, { Fragment, useEffect, useState } from 'react'
import SidebarMenu from './SidebarMenu'
import { Children, Items, MENUITEMS } from './Menu'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import Profile from './Profile'
import styles from './index.module.css'
import { setToggleIcon } from '../ThemeCustomizer/ThemeCustomizerSlice'
import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'react-feather'

const SideBar = (props: any) => {
  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)

  const [currentUrl] = useState(window.location.pathname)
  const id = window.location.pathname.split('/').pop()
  // eslint-disable-next-line
  const [leftArrow, setLeftArrow] = useState(false)
  const layout = id
  const [width, setWidth] = useState(0)
  const handleResize = () => {
    setWidth(window.innerWidth - 500)
  } // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS)
  const handleScroll = () => {
    if (window.scrollY > 400) {
      const mainBarByClass = document.querySelector('.main-navbar')
      if (mainBarByClass) mainBarByClass.className = 'main-navbar hovered'
    } else {
      const mainBarById = document.getElementById('main-navbar')
      if (mainBarById) mainBarById.className = 'main-navbar'
    }
  }

  let mainMenuArray = Array.from(mainmenu)

  const setNavActive = (item: any) => {
    mainMenuArray.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== (item as Items)) {
          Items.active = false
          document.getElementById('bg-overlay1')?.classList.remove('active')
        }
        if (Items.children && Items.children.includes(item as Children)) {
          Items.active = true
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item as Children)) {
              Items.active = true
              submenuItems.active = true
              return true
            } else {
              return false
            }
          })
        }
        return Items
      })
      return menuItems
    })
    item.active = !item.active
    setMainMenu(mainMenuArray)
  }
  useEffect(() => {
    setLeftArrow(true)
    window.addEventListener('resize', handleResize)
    handleResize()
    const currentUrl = window.location.pathname
    mainMenuArray.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) {
          setNavActive(Items)
        }
        if (!Items.children) return false
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) {
            setNavActive(subItems)
          }
          if (!subItems.children) return false
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems)
              return true
            } else {
              return false
            }
          })
          return subItems
        })
        return Items
      })
      return items
    })
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line
  }, [layout, currentUrl])

  const closeOverlay = () => {
    document.getElementById('bg-overlay1')?.classList.remove('active')
    document.getElementById('nav-link')?.classList.remove('active')
  }

  const dispatch = useAppDispatch()

  return (
    <Fragment>
      <div
        id="bg-overlay1"
        onClick={() => {
          closeOverlay()
        }}
      ></div>
      <header
        style={{ zIndex: '1020' }}
        className={classNames('main-nav', styles.sidebar, {
          [styles.sidebarCollapsed]: toggleIcon,
          [styles.sidebarExpanded]: !toggleIcon,
          close_icon: toggleIcon,
        })}
      >
        {/* we need this sidebarChild to position the toggle icon */}
        <div
          className={classNames(styles.sidebarChild, {
            [styles.sidebarChildCollapsed]: toggleIcon,
            [styles.sidebarChildExpanded]: !toggleIcon,
          })}
        >
          <div
            role="button"
            className={styles.collapseIcon}
            onClick={() => {
              dispatch(setToggleIcon(!toggleIcon))
            }}
          >
            {toggleIcon && <ChevronRight size={18} />}
            {!toggleIcon && <ChevronLeft size={18} />}
          </div>

          <div
            className={classNames(styles.contentContainer, {
              [styles.collapsedContentContainer]: toggleIcon,
              [styles.expandedContentContainer]: !toggleIcon,
            })}
          >
            <div className={styles.content}>
              <Profile />

              <SidebarMenu
                setMainMenu={setMainMenu}
                props={props}
                sidebartoogle={true}
                setNavActive={setNavActive}
                width={width}
              />
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}
export default SideBar
