import Newsletter from "$store/islands/Newsletter.tsx";
import PaymentSystems from "$store/components/footer/PaymentSystems.tsx";
import SecuritySystems, {
  SecuritySystemsProps,
} from "$store/components/footer/SecuritySystems.tsx";
import SocialNetworks, {
  SocialNetworkProps,
} from "$store/components/footer/SocialNetworks.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import type { PaymentSystemProps } from "$store/components/footer/PaymentSystems.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { ComponentChildren } from "preact";

export type StringItem = {
  label?: string;
  href?: string;
};

export type IconItem = {
  label?: HTML;
  href?: string;
  icon?: AvailableIcons;
};
export type AdvancedItem = {
  text?: HTML;
};

export type Item = StringItem | IconItem | AdvancedItem;

export interface Section {
  /**
   * @title Título
   */
  label?: string;
  children: Item[];
  /**
   * @title Mostrar formas de pagamento?
   */
  showPaymentSystems?: boolean;
  /**
   * @title Mostrar selos de segurança?
   */
  showSecuritySystems?: boolean;
  /**
   * @title Mostrar redes sociais?
   */
  showSocialNetworks?: boolean;
  /**
   * @title Mostrar o menu em 2 colunas?
   */
  showGrid?: boolean;
}

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

const isAdvanced = (item: Item): item is AdvancedItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.text === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text variant="text-footer" tone="black">
      {isAdvanced(item)
        ? (
          <>
            <div
              class="footer-advanced-item"
              dangerouslySetInnerHTML={{ __html: item?.text || "" }}
            />
          </>
        )
        : isIcon(item)
        ? (
          <a
            class="mb-[15px] flex items-start justify-start"
            href={item?.href}
          >
            <Icon
              class="mt-1"
              id={item?.icon}
              size={13}
            />

            <div
              class="footer-icon-item ml-3 whitespace-break-spaces sm:whitespace-pre transition-colors hover:text-badge"
              dangerouslySetInnerHTML={{ __html: item?.label || "" }}
            />
          </a>
        )
        : (
          <a href={item?.href}>
            {item?.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div
      class={`max-w-[1300px] mx-auto flex justify-between w-full ${_class}`}
    >
      {children}
    </div>
  );
}

export interface Props {
  /**  @title Formas de Pagamento */
  paymentSystem?: PaymentSystemProps;
  /**  @title Selos de Segurança */
  securitySystem?: SecuritySystemsProps;
  /**  @title Redes Sociais */
  socialNetwork?: SocialNetworkProps;
  /**  @title Copyright */
  copyright?: HTML;
  /**  @title Seções */
  sections?: Section[];
}

function Footer(
  { paymentSystem, securitySystem, socialNetwork, copyright, sections = [] }:
    Props,
) {
  return (
    <footer class="w-full bg-footer flex flex-col">
      <Newsletter />

      <FooterContainer class="sm:p-2.5">
        {/* Desktop view */}
        <ul class="hidden sm:flex flex-row gap-20 sm:grid grid-cols-[1fr_0.9fr_0.9fr_1.2fr] divide-x-1">
          {sections.map((section, index) => (
            <li
              class={`pt-5 pb-10 flex flex-col justify-between h-full ${
                index > 0 ? "pl-5" : "pl-5 sm:pl-0"
              }`}
            >
              <>
                <Text
                  class="mb-[15px] sm:mb-[25px] font-semibold block"
                  variant="heading-footer"
                  tone="black"
                >
                  {section.label}
                </Text>

                <ul
                  class={`flex flex-grow flex-col`}
                >
                  {section.children.map((item) => (
                    <li class="leading-none">
                      <SectionItem item={item} />
                    </li>
                  ))}
                </ul>

                {section?.showPaymentSystems && (
                  <PaymentSystems {...paymentSystem} />
                )}
                {section?.showSecuritySystems && (
                  <SecuritySystems {...securitySystem} />
                )}
                {section?.showSocialNetworks && (
                  <SocialNetworks {...socialNetwork} />
                )}
              </>
            </li>
          ))}
        </ul>

        {/* Mobile view */}
        <ul class="px-[30px] py-2.5 flex flex-col sm:items-center sm:hidden sm:flex-row sm:gap-4">
          {sections.map((section, index) => (
            <li
              class={`pt-5 flex flex-col justify-between h-full`}
            >
              <>
                <Text
                  class="mb-[15px] sm:mb-[25px] font-semibold block"
                  variant="heading-footer"
                  tone="black"
                >
                  {section.label}
                </Text>

                <ul
                  class={`flex flex-grow flex-col ${
                    section?.showGrid ? "grid grid-cols-[1fr_1fr] sm:flex" : ""
                  }`}
                >
                  {section.children.map((item) => (
                    <li class="leading-none">
                      <SectionItem item={item} />
                    </li>
                  ))}
                </ul>

                {section?.showPaymentSystems && (
                  <PaymentSystems {...paymentSystem} />
                )}
                {section?.showSecuritySystems && (
                  <SecuritySystems {...securitySystem} />
                )}
                {section?.showSocialNetworks && (
                  <SocialNetworks {...socialNetwork} />
                )}
              </>
            </li>
          ))}
        </ul>
      </FooterContainer>

      <div class="bg-white border-t-1 border-solid border-lightgray p-2.5">
        <FooterContainer class="flex-col gap-4 sm:gap-0 sm:grid sm:grid-cols-[50%_50%]">
          <div
            class="font-regular text-default text-xs text-copyright"
            dangerouslySetInnerHTML={{ __html: copyright || "" }}
          >
          </div>

          <Text
            variant="regular"
            class="flex items-center gap-1 text-xs text-copyright"
            tone="default"
          >
            Developed with <Icon id="HeartFooter" width={11} height={10} /> by
            {" "}
            <b>Time 19</b>
            and Powered by
            <a
              href="https://www.deco.cx"
              aria-label="powered by https://www.deco.cx"
            >
              <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
            </a>
          </Text>
        </FooterContainer>
      </div>
    </footer>
  );
}

export default Footer;
