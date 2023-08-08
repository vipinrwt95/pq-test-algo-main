import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Children, Items, MENUITEMS } from './Menu'
import { Label } from 'reactstrap'
import { UL, LI, BasicTooltip } from '../../../utils/ReusableElements'
import styles from './SidebarMenuItems.module.css'
import { RootState } from 'src/app/store'
import { useAppSelector } from 'src/app/hooks'

const SidebarMenuItems = ({
  setMainMenu,
  sidebartoogle,
  setNavActive,
}: {
  setMainMenu: any
  sidebartoogle: any
  setNavActive: any
  props?: any
}) => {
  // eslint-disable-next-line
  const { t } = useTranslation()

  const toggleNavActive = (item: any) => {
    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item as Items)) Items.active = false
          if (!Items.children) return false
          Items.children.forEach((b) => {
            if (Items.children?.includes(item as Children)) {
              b.active = false
            }
            if (!b.children) return false
            b.children.forEach((c) => {
              if (b.children)
                if (b.children.includes(item as Children)) {
                  c.active = false
                }
            })
          })
          return Items
        })
        return a
      })
    }
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)

  return (
    <Fragment>
      <UL attrUL={{ className: 'nav-menu custom-scrollbar' }}>
        <LI attrLI={{ className: 'back-btn' }}>
          <div className="mobile-back text-end">
            <span>Back</span>
            <i className="fa fa-angle-right ps-2"></i>
          </div>
        </LI>

        {MENUITEMS.map((Item, i) => (
          <Fragment key={i}>
            {/* <LI attrLI={{ className: 'sidebar-main-title' }} >
              <div>
                <H6>{t(Item.menutitle ? Item.menutitle : 'translation')}</H6>
              </div>
            </LI> */}
            {Item.Items.map((menuItem, i) => (
              <LI attrLI={{ className: 'dropdown p-0' }} key={i}>
                {menuItem.type === 'sub' && (
                  <a
                    href="javascript"
                    id="nav-link"
                    className={`nav-link menu-title ${menuItem.active ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setNavActive(menuItem)
                    }}
                  >
                    {menuItem.icon !== undefined && <menuItem.icon />}
                    <span>{t(menuItem.title)}</span>
                    <div className="according-menu">
                      {menuItem.active ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
                    </div>
                  </a>
                )}
                {menuItem.type === 'link' && (
                  <Link
                    to={menuItem.path ? menuItem.path : ''}
                    id="nav-link"
                    className={`pq-no-border-radius nav-link menu-title ${menuItem.active ? 'active' : ''}`}
                    onClick={() => toggleNavActive(menuItem)}
                  >
                    {/* wrap the icon with tooltip if sidebar is not collapsed */}
                    {toggleIcon && (
                      <BasicTooltip
                        placement="right"
                        text={t(menuItem.title)}
                        id={`side-bar-menu-item-link-${i}`}
                        offset={[0, 0]}
                      >
                        {menuItem.icon !== undefined && (
                          <span className={styles.menuIcon}>
                            <menuItem.icon />
                          </span>
                        )}
                      </BasicTooltip>
                    )}

                    {/* show icon only if sidebar is not collapsed */}
                    {!toggleIcon && menuItem.icon !== undefined && <menuItem.icon />}

                    <span>{t(menuItem.title)}</span>

                    {menuItem.badge && <Label className={menuItem.badge}>{menuItem.badgetxt}</Label>}
                  </Link>
                )}
                {menuItem.children && (
                  <UL
                    attrUL={{
                      className: 'simple-list sidebar-submenu',
                      style: menuItem.active
                        ? sidebartoogle
                          ? {
                              opacity: 1,
                              transition: 'opacity 500ms ease-in',
                            }
                          : { display: 'block' }
                        : { display: 'none' },
                    }}
                  >
                    <UL attrUL={{ className: 'nav-submenu menu-content' }}>
                      {menuItem.children.map((childrenItem, index) => {
                        return (
                          <LI key={index}>
                            {childrenItem.type === 'sub' && (
                              <a
                                href="javascript"
                                className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={(event) => {
                                  event.preventDefault()
                                  toggleNavActive(childrenItem)
                                }}
                              >
                                {t(childrenItem.title)}
                                <div className="according-menu">
                                  {childrenItem.active ? (
                                    <i className="fa fa-caret-down"></i>
                                  ) : (
                                    <i className="fa fa-caret-right"></i>
                                  )}{' '}
                                </div>
                              </a>
                            )}
                            {childrenItem.type === 'link' && (
                              <Link
                                to={childrenItem.path}
                                className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={() => toggleNavActive(childrenItem)}
                              >
                                {t(childrenItem.title)}
                              </Link>
                            )}
                            {childrenItem.children && (
                              <UL
                                attrUL={{
                                  className: 'simple-list nav-sub-childmenu submenu-content',
                                  style: childrenItem.active ? { display: 'block' } : { display: 'none' },
                                }}
                              >
                                {childrenItem.children.map((childrenSubItem, key: number) => (
                                  <LI key={key}>
                                    {childrenSubItem.type === 'link' && (
                                      <Link
                                        to={childrenSubItem.path}
                                        className={`${childrenSubItem.active ? 'active' : ''}`}
                                        onClick={() => toggleNavActive(childrenSubItem)}
                                      >
                                        {t(childrenSubItem.title)}
                                      </Link>
                                    )}
                                  </LI>
                                ))}
                              </UL>
                            )}
                          </LI>
                        )
                      })}
                    </UL>
                  </UL>
                )}
              </LI>
            ))}
          </Fragment>
        ))}
      </UL>
    </Fragment>
  )
}
export default SidebarMenuItems
