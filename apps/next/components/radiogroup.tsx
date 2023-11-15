import { RadioGroup, Label, XStack } from '@my/ui'

const Radio = ({ items, onChange, selectedVal, ...props }: any) => {
  return (
    <>
      <RadioGroup onValueChange={onChange} value={selectedVal} size={4} space="$2">
        {items.map((item, i: Number) => (
          <XStack key={`${i}`} space="$2" alignItems="center">
            <RadioGroup.Item size={'$4'} value={item} id={`${item}radio-item`}>
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <Label size={'$4'} htmlFor={`${item}radio-item`}>
              {item}
            </Label>
          </XStack>
        ))}
      </RadioGroup>
    </>
  )
}

export default Radio
