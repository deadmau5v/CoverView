# Internationalization (i18n) Guide

This project uses `react-i18next` for internationalization support.

## Features

- 🌐 Automatic browser language detection
- 🔄 Manual language switching via UI
- 💾 Language preference persistence (localStorage + cookies)
- 🇺🇸 English (en)
- 🇨🇳 Chinese (zh)

## How It Works

### Automatic Detection

The app automatically detects the user's preferred language from:
1. Browser navigator language
2. HTML lang attribute
3. URL path
4. Subdomain

If no language is detected, it falls back to English.

### Language Switching

Users can manually switch languages using the language selector in the header.

## Usage for Developers

### 1. In Function Components

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('home.hero.subtitle')}</p>
    </div>
  );
};
```

### 2. In Class Components

```typescript
import { withTranslation } from 'react-i18next';

class MyComponent extends React.Component {
  render() {
    const { t } = this.props;
    return <h1>{t('common.title')}</h1>;
  }
}

export default withTranslation()(MyComponent);
```

### 3. Accessing i18n Instance

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  // Change language programmatically
  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  // Get current language
  console.log(i18n.language); // 'en' or 'zh'

  return <button onClick={switchLanguage}>Switch Language</button>;
};
```

## Adding New Languages

### Step 1: Create Translation File

Create a new file at `src/locales/{language_code}/translation.json`:

```json
{
  "common": {
    "title": "Translated Title",
    ...
  }
}
```

### Step 2: Update i18n Configuration

Edit `src/i18n.ts` and add the new language:

```typescript
import newLangTranslation from './locales/new-lang/translation.json';

const resources = {
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
  'new-lang': { translation: newLangTranslation }, // Add this
};
```

### Step 3: Update Language Switcher

Edit `src/components/LanguageSwitcher.tsx`:

```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'new-lang', name: 'Language Name', flag: '🏳️' }, // Add this
];
```

## Translation Keys Structure

```
common.*          - Common UI elements (title, author, download, etc.)
header.*          - Header navigation items
editor.*          - Editor panel labels and placeholders
themes.*          - Theme names
colorThemes.*     - Color scheme names
fonts.*           - Font family names
sizes.*           - Canvas size presets
patterns.*        - Background pattern names
home.*            - Home page content
faq.*             - FAQ page content
unsplash.*        - Unsplash search UI
messages.*        - System messages and notifications
```

## Best Practices

1. **Use Namespaced Keys**: Organize translations hierarchically
   ```typescript
   t('editor.titlePlaceholder') // Good
   t('title_placeholder')       // Bad
   ```

2. **Keep Keys Semantic**: Use descriptive key names
   ```typescript
   t('home.hero.title')         // Good
   t('home.text1')              // Bad
   ```

3. **Avoid Hardcoded Text**: Always use translation keys
   ```typescript
   <h1>{t('common.title')}</h1>           // Good
   <h1>Title</h1>                          // Bad
   ```

4. **Use Interpolation for Dynamic Content**:
   ```typescript
   // In translation file:
   {
     "welcome": "Welcome, {{name}}!"
   }

   // In component:
   t('welcome', { name: userName })
   ```

5. **Pluralization Support**:
   ```typescript
   // In translation file:
   {
     "itemCount": "{{count}} item",
     "itemCount_plural": "{{count}} items"
   }

   // In component:
   t('itemCount', { count: 5 })  // "5 items"
   ```

## Testing Translations

### Check Missing Keys

```bash
# Check if all keys are translated
bun run i18n:check
```

### Test Different Languages

1. Change browser language settings
2. Clear localStorage and cookies
3. Reload the app
4. Or use the language switcher in the UI

## Configuration

The i18n configuration is in `src/i18n.ts`:

- `fallbackLng`: Default language if detection fails (currently 'en')
- `debug`: Set to `true` to see i18n debug logs
- `detection.order`: Priority order for language detection
- `detection.caches`: Where to store language preference

## See Also

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- Example: See `src/components/I18nDemo.tsx` for usage examples
