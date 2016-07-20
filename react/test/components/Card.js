import Card from 'components/Card';

describe('Card', () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      text: "Go to Grocery Store"
    };
    wrapper = shallow(
      <Card {...props} />
    );
  })
  it('should display its props', () => {
    expect(wrapper.text()).toContain(props.text);
  });
});
