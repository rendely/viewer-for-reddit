import {
  ActionIcon,
  Flex,
  Modal,
  Stack,
  Switch,
  createStyles,
  useMantineColorScheme
} from '@mantine/core'
import {useDisclosure, useHotkeys} from '@mantine/hooks'
import {IconSettings} from '@tabler/icons-react'
import {useRedditContext} from '~/components/RedditProvider'
import Sort from '~/components/Sort'
import config from '~/lib/config'

const useStyles = createStyles((theme) => ({
  settings: {
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md
    }
  }
}))

/**
 * Settings component.
 */
export default function Settings() {
  const [opened, {open, close}] = useDisclosure(false)
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()
  const {autoPlay, blurNSFW, setAutoplay, setBlurNSFW} = useRedditContext()
  const {classes} = useStyles()

  useHotkeys([['mod+i', () => setAutoplay(!autoPlay)]])
  useHotkeys([['mod+b', () => setBlurNSFW(!blurNSFW)]])

  return (
    <>
      <ActionIcon
        aria-label="open settings"
        className={classes.settings}
        onClick={open}
        size="lg"
        variant="transparent"
      >
        <IconSettings size={48} />
      </ActionIcon>

      <Modal
        closeButtonProps={{'aria-label': 'close settings'}}
        onClose={close}
        opened={opened}
        padding="xl"
        title="Settings"
      >
        <Stack justify="space-between">
          <Sort />
          <Switch
            aria-label="toggle between light and dark theme."
            checked={autoPlay}
            label="Auto Play Media (⌘+I)"
            offLabel="OFF"
            onChange={(event) => setAutoplay(event.currentTarget.checked)}
            onLabel="ON"
            size="lg"
          />
          <Switch
            aria-label="toggle between light and dark theme."
            checked={colorScheme === 'dark'}
            label="Dark Theme (⌘+J)"
            offLabel="OFF"
            onChange={() => toggleColorScheme()}
            onLabel="ON"
            size="lg"
          />
          <Switch
            aria-label="blur NSFW Media"
            checked={blurNSFW}
            label="Blur NSFW Media (⌘+B)"
            offLabel="OFF"
            onChange={(event) => setBlurNSFW(event.currentTarget.checked)}
            onLabel="ON"
            size="lg"
          />
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            Thank you for using {config.siteTitle}! Would you consider
            sponsoring further development for just $5?
            <iframe
              src="https://github.com/sponsors/gregrickaby/button"
              title="Sponsor gregrickaby"
              height="32"
              width="114"
              style={{border: '0', borderRadius: '6px'}}
            />
          </Flex>
        </Stack>
      </Modal>
    </>
  )
}
