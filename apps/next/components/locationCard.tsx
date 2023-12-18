import { Card, XStack, YStack, Text, Image } from '@my/ui'
import { Location } from '../pages/locations'

export const LocationCard = ({ location, onClick }: { location: Location; onClick: any }) => (
  <Card onPress={onClick} className="load-hidden" backgroundColor={'white'}>
    <XStack>
      <Image
        zIndex={0}
        source={{
          uri: 'https://source.unsplash.com/random',
        }}
        width={80}
        height={80}
        borderTopLeftRadius={10}
        borderBottomLeftRadius={10}
        alt="avatar"
      />
      <Card.Header></Card.Header>
      <YStack top={16}>
        <XStack width={250} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${location.name}`}
          </Text>
          <XStack space="$0" alignItems="center" justifyContent="space-evenly" paddingRight={12}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 12.1667C3.11254 10.7215 4.96243 9.83333 7 9.83333C9.03757 9.83333 10.8875 10.7215 12.25 12.1667M9.625 4.875C9.625 6.32475 8.44975 7.5 7 7.5C5.55025 7.5 4.375 6.32475 4.375 4.875C4.375 3.42525 5.55025 2.25 7 2.25C8.44975 2.25 9.625 3.42525 9.625 4.875Z"
                stroke="#3A4ADF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Text color={'blue'} fontSize={14}>
              {`${location.staffAmount || 0}`}
            </Text>
          </XStack>

          {/* <Text color={'blue'} fontSize={14}>
        </Text> */}
        </XStack>
        <Text fontSize={14} color={'slategray'} width={250} paddingRight={12} numberOfLines={2}>
          {location.address}
        </Text>
      </YStack>
    </XStack>
  </Card>
)
