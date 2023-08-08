import { GroupBase, StylesConfig, ThemeConfig } from 'react-select'
import { Spinner } from 'reactstrap'
import { SelectOption } from 'src/features/types'

export const SelectLoading = () => <Spinner className="my-5" />

export const selectCustomStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  control: (styles) => ({
    ...styles,
    border: 'none!important',
    boxShadow: 'none!important',
    minHeight: '33px',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
  }),
  loadingIndicator: (styles) => ({ ...styles, marginRight: '0' }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '2px 8px',
  }),
  option: (styles, { data, isSelected }) => {
    const indentSize = 16

    return {
      ...styles,
      ...(isSelected ? { color: 'var(--react-select-on-primary)' } : {}),
      // 12 is the default padding for options
      paddingLeft: `${12 + indentSize * (data?.depth || 0)}px`,
    }
  },
  container: (styles) => ({
    ...styles,
    // commented out zIndex to fix overlapping issue on right side of the blogPostForm,
    // instead of putting zIndex here, we put it on the parent of the react-select
    // zIndex: 3,
  }),
  // restrict height of the clearIndicator to 33px
  clearIndicator: (styles) => ({
    ...styles,
    padding: '6px 8px',
  }),
}

export const selectThemeConfig: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'var(--react-select-primary)',
    primary75: 'var(--react-select-primary75)',
    primary50: 'var(--react-select-primary50)',
    primary25: 'var(--react-select-primary25)',
    danger: 'var(--react-select-danger)',
    neutral0: 'var(--react-select-neutral0)',
    neutral5: 'var(--react-select-neutral5)',
    neutral10: 'var(--react-select-neutral10)',
    neutral20: 'var(--react-select-neutral20)',
    neutral30: 'var(--react-select-neutral30)',
    neutral40: 'var(--react-select-neutral40)',
    neutral50: 'var(--react-select-neutral50)',
    neutral60: 'var(--react-select-neutral60)',
    neutral70: 'var(--react-select-neutral70)',
    neutral80: 'var(--react-select-neutral80)',
    neutral90: 'var(--react-select-neutral90)',
  },
})

/**
    EXAMPLE USAGE:

    <ReactSelect
      styles={selectCustomStyles}
      theme={selectThemeConfig}
      loadingMessage={SelectLoading}
      options={centerOptions}
      value={(centerOptions || []).find((c) => c.value === centerId)}
      onChange={(val) => handleSelectedCenter(_isNil(val?.value) ? null : Number(val?.value))}
      placeholder="Choose Center"
      isLoading={isLoadingCenterOptions}
      isClearable
    />
*/

/** [COLOR Select] ================ */

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 16,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 16,
    width: 16,
  },
})

type SelectColorOption = { value: number | string; label: string; color: string }

export const selectColorCustomStyles: StylesConfig<SelectColorOption, false, GroupBase<SelectColorOption>> = {
  control: (styles) => ({
    ...styles,
    border: 'none!important',
    boxShadow: 'none!important',
    minHeight: '33px',
    backgroundColor: 'white',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '2px 8px',
  }),
  container: (styles) => ({
    ...styles,
  }),
  // restrict height of the clearIndicator to 33px
  clearIndicator: (styles) => ({
    ...styles,
    padding: '6px 8px',
  }),

  // control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isSelected }) => {
    const color = data.color
    return {
      ...styles,
      ...(isSelected ? { color: 'var(--react-select-on-primary)' } : {}),
      ...dot(color),
    }
  },

  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}
