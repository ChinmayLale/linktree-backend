export interface ThemeSettings {
   name: string;
   backgroundColor: string;
   backgroundType: "solid" | "gradient" | "image" | "glass";
   primaryColor: string;
   textColor: string;
   fontFamily?: string;
   borderRadius?: number;
   cardStyle: string;
   layout?: "stack" | "grid" | "masonry";
   cardBackground: string;
   cardBorderColor?: string;
   cardShadow?: string;
   cardPadding?: string;
   cardBorder: string;
   backdropBlur: string;
   shadow?: string;
   secondaryText: string;
}

