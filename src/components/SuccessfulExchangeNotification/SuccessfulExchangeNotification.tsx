import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';
import { Page } from '../../common-styles/page';
import Currency from '../../models/Currency';
import { IconWrapper, Panel, Shadow, Summary } from './style';

type SuccessfulExchangeNotificationProps = {
    fromCurrency: Currency;
    fromAmount: string;
    toCurrency: Currency;
    toAmount: string;
    onClose: () => void;
};

function SuccessfulExchangeNotification({
    fromCurrency,
    fromAmount,
    toCurrency,
    toAmount,
    onClose,
}: SuccessfulExchangeNotificationProps) {
    const { t } = useTranslation();

    useEffect(() => {
        const id = setTimeout(onClose, 2000);

        return () => clearTimeout(id);
    }, [onClose]);

    return (
        <Shadow>
            <Page>
                <Panel onClick={onClose} role="alertdialog">
                    <IconWrapper>
                        <BsCheckCircle></BsCheckCircle>
                    </IconWrapper>
                    {t('you_exchanged')}
                    <Summary>
                        {t('exchange_summary', {
                            from: fromCurrency.format(fromAmount),
                            to: toCurrency.format(toAmount),
                        })}
                    </Summary>
                </Panel>
            </Page>
        </Shadow>
    );
}

export default SuccessfulExchangeNotification;
