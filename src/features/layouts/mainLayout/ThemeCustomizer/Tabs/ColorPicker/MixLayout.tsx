import React, { Fragment, useEffect } from 'react'
import { useAppDispatch } from '../../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../../config/ThemeConfig'
import { H6, UL, LI } from '../../../../../utils/ReusableElements'
import { setMixBackgroundLayout, setMixLayout } from '../../ThemeCustomizerSlice'
import CommenUL from '../Sidebar/CommenUL'

const MixLayoutComponent = () => {
  const dispatch = useAppDispatch()
  const mixLayout =
    localStorage.getItem('mix_background_layout') || ThemeConfigurations.data.color.mix_background_layout

  useEffect(() => {
    dispatch(setMixLayout())
    ThemeConfigurations.data.color.mix_background_layout = mixLayout
    document.body.classList.add(mixLayout)
  }, [dispatch, mixLayout])

  const handleCustomizerMix_Background = (value: string) => {
    dispatch(setMixBackgroundLayout(value))
    if (value === 'light-only') {
      document.body.classList.add('light-only')
      document.body.classList.remove('dark-sidebar')
      document.body.classList.remove('dark-only')
    } else if (value === 'dark-sidebar') {
      document.body.classList.remove('light-only')
      document.body.classList.add('dark-sidebar')
      document.body.classList.remove('dark-only')
    } else if (value === 'dark-only') {
      document.body.classList.remove('light-only')
      document.body.classList.remove('dark-sidebar')
      document.body.classList.add('dark-only')
    }
  }
  return (
    <Fragment>
      <H6 className="">{mixLayout}</H6>
      <UL attrUL={{ className: 'layout-grid customizer-mix' }}>
        <LI
          attrLI={{
            className: 'color-layout active',
            dataattr: 'light-only',
            onClick: () => handleCustomizerMix_Background('light-only'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-light sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}> </LI>
            </UL>
          </div>
        </LI>
        <LI
          attrLI={{
            className: 'color-layout',
            dataattr: 'dark-sidebar',
            onClick: () => handleCustomizerMix_Background('dark-sidebar'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-dark sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}> </LI>
            </UL>
          </div>
        </LI>
        <LI
          attrLI={{
            className: 'color-layout',
            dataattr: 'dark-only',
            onClick: () => handleCustomizerMix_Background('dark-only'),
          }}
        >
          <div className="header bg-dark">
            <CommenUL />
          </div>
          <div className="body">
            <UL>
              <LI attrLI={{ className: 'bg-dark sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-dark body' }}> </LI>
            </UL>
          </div>
        </LI>
      </UL>
    </Fragment>
  )
}

export default MixLayoutComponent
