import { platformStyles } from './platformStyles';

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34, fontFamily: platformStyles.fontFamily },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28, fontFamily: platformStyles.fontFamily },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22, fontFamily: platformStyles.fontFamily },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18, fontFamily: platformStyles.fontFamily },
  button: { fontSize: 15, fontWeight: '600' as const, lineHeight: 20, fontFamily: platformStyles.fontFamily },
};