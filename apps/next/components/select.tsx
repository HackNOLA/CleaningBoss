import { Select } from '@my/ui' // or '@tamagui/select'
export default function Selection({ items, onChange, value, placeholder, ...props }: any) {
  return (
    <Select onValueChange={onChange} defaultValue={items[0]}>
      <Select.Trigger>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Select.Content>
        <Select.ScrollUpButton />

        <Select.Viewport>
          <Select.Group>
            <Select.Label />
            {items.map((item: String, i: Number) => (
              <Select.Item key={i} value={item} index={i}>
                <Select.ItemText>{item}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  )
}
