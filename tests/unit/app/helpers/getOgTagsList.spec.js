import getOgTagsList from '../../../../app/helpers/getOgTagsList'

describe('helpers: getOgTagsList: Get the list of OG tags', () => {
  it('it should return an array', () => {
    const result = getOgTagsList()
    expect(result).toMatchSnapshot()
  })
})
