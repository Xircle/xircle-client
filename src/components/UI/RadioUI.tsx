import React, { useState, useEffect, FormEvent } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { HtmlInputrops } from 'semantic-ui-react/dist/commonjs/generic';

type RadioUIProps = {
  subject: string;
  isFirstValue: boolean;
  changeHandler: (e: FormEvent<HtmlInputrops>) => void;
}
const RadioUI = ({ subject, isFirstValue, changeHandler }: RadioUIProps) => { 
    const [valueArr, setValueArr] = useState<string []>([]);
    
    useEffect((): void => {
      if(!subject) return

      if(subject === 'privateOrNot') {
        setValueArr(['public', 'private', '공개', '비공개']);
      } else if(subject === 'graduateOrNot')
        setValueArr(['graduate', 'attending', '졸업', '재학중']);
    }, [subject]);

    return (
        <Form className="flex flex-row justify-evenly mt-10">
          {valueArr.length === 4 ? (
            <>
              <Form.Field>
                <Radio
                  label={valueArr[2]}
                  value={valueArr[0]}
                  checked={isFirstValue === true}
                  onChange={changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={valueArr[3]}
                  value={valueArr[1]}
                  checked={isFirstValue === false}
                  onChange={changeHandler}
                />
              </Form.Field>
            </>
          ) : (
            null
          )}
        </Form>
    )
}
export default RadioUI;