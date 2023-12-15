'use client'
import { Ability } from '../interfaces/full-pokemon';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './PokemonAbilities.module.css';

interface Props {
    abilities: Ability[];
}

const AccordionItem = ({ header='', ...rest }) => (
    <Item
        {...rest}
        header={ header }
        className={ styles.item }
        buttonProps={{
            className: ({ isEnter }) =>
            `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
        }}
        contentProps={{ className: styles.itemContent }}
        panelProps={{ className: styles.itemPanel }}
    />
);

export function PokemonAbilities({ abilities } : Props ) {

	return (
        <Accordion transition transitionTimeout={250}>
            { abilities.map( ( abilityObject: any, index: number ) => {
                return (
                    <AccordionItem  key={ abilityObject.id } header={ abilityObject.name } initialEntered={ index === 0 }>
                        { abilityObject.effect_entries && abilityObject.effect_entries[0]
                            && ( abilityObject.effect_entries[0].effect )
                        }
                    </AccordionItem>
                )
            })}
        </Accordion>
	)
}