import React from 'react';
import './style.css';

const EsPanel = props => (
    <main className={'hcl__main w-100'+(props.h100 ? '' : ' espanel')}>
        <div className='d-flex flex-column flex-grow-1'>
            <section className='hcl__content'>
                <div className='content__wrapper'>
                    {props.children}
                </div>
            </section>
            {props.actions && 
                <section className='content__footer__action justify-content-between espanel-actions'>
                    {props.actions}
                </section>
            }
        </div>
    </main>
)

export default EsPanel;
