import { RadioGroup } from '@my/ui'

const Radio = ({ items, onChange, selectedVal, ...props }: any) => {
  return (
    <>
      <RadioGroup onValueChange={onChange} value={selectedVal} size={4} space="$2">
        {items.map((item: String, i: Number) => (
          <RadioGroup.Item key={i} value={item} id={`${item}radio-item`}>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
        ))}
      </RadioGroup>
    </>
  )
}

export default Radio
